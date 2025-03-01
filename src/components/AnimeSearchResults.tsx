"use client";

import { searchAnime } from "@/app/actions/animeSearch";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface AnimeResult {
	title: string;
	slug: string;
	url: string;
	image: string;
}

interface AnimeSearchResultsProps {
	className?: string;
	limit?: number;
}

/**
 * Component to display anime search results based on URL search parameters
 * Uses React Query for efficient data fetching and caching
 */
export default function AnimeSearchResults({
	className = "",
	limit = 12,
}: Readonly<AnimeSearchResultsProps>) {
	// Get query from URL search parameters
	const searchParams = useSearchParams();
	const query = searchParams.get("q") ?? "";

	// Use React Query for data fetching with automatic caching and retry logic
	const {
		data: results = [],
		isLoading,
		error,
	} = useQuery<AnimeResult[]>({
		queryKey: ["animeSearch", query],
		queryFn: async () => {
			if (!query || query.trim() === "") {
				return [];
			}
			// searchAnime is a server action that will talk to our API endpoint
			// which handles the database caching logic
			return searchAnime(query);
		},
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // Client-side cache for 5 minutes
		enabled: query.trim() !== "",
	});

	// Show loading state
	if (isLoading) {
		return (
			<div className={`w-full ${className}`}>
				<div className="flex flex-col items-center justify-center py-12">
					<div className="animate-pulse space-y-4 w-full max-w-3xl">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{[...Array(limit)].map((_, i) => (
								<div
									key={i}
									className="bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden h-64"
								>
									<div className="h-40 bg-slate-300 dark:bg-slate-700"></div>
									<div className="p-3 space-y-2">
										<div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
										<div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Show error message
	if (error) {
		return (
			<div className={`w-full ${className} py-8`}>
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
					<p className="text-red-600 dark:text-red-400 text-center">
						{error instanceof Error ? error.message : "Failed to load results."}
					</p>
				</div>
			</div>
		);
	}

	// Show empty state
	if (results.length === 0 && query.trim() !== "") {
		return (
			<div className={`w-full ${className} py-8`}>
				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
					<p className="text-blue-600 dark:text-blue-400 font-medium">
						No anime found matching &quot;{query}&quot;
					</p>
					<p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
						Try a different search term
					</p>
				</div>
			</div>
		);
	}

	// Show search results
	return (
		<div className={`w-full ${className}`}>
			{query.trim() !== "" && results.length > 0 && (
				<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
					Showing {results.length} results for &quot;{query}&quot;
				</p>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{results.map((anime, index) => (
					<Link
						href={anime.url}
						key={`${anime.slug}-${index}`}
						target="_blank"
						rel="noopener noreferrer"
						className="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-primary-500 h-full flex flex-col"
					>
						<div className="relative w-full h-40 overflow-hidden bg-slate-200 dark:bg-slate-700">
							<Image
								src={anime.image}
								alt={anime.title}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								onError={(e) => {
									// Enhanced error handling for image loading failures
									const target = e.target as HTMLImageElement;
									const fallbackSrc =
										"https://i.pinimg.com/736x/54/5d/d4/545dd43ddc4ad65b731304f2799dc705.jpg";

									// Track if we're already using the fallback to prevent infinite loops
									const isAlreadyFallback =
										target.src.includes(fallbackSrc) ||
										target.getAttribute("data-using-fallback") === "true";

									if (!isAlreadyFallback) {
										// Set fallback image and mark it to prevent potential loops
										target.src = fallbackSrc;
										target.setAttribute("data-using-fallback", "true");

										// Log the failed URL for monitoring purposes
										console.warn("Image failed to load:", anime.image);
									}
								}}
							/>
						</div>
						<div className="p-4 flex-grow flex flex-col">
							<h3 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2 mb-2">
								{anime.title}
							</h3>
							<div className="mt-auto pt-2">
								<span className="text-xs inline-block py-1 px-2 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
									View Details
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
