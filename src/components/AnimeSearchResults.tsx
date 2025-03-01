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
	const trimmedQuery = query.trim();

	// Use React Query for data fetching with automatic caching and retry logic
	const {
		data: results = [],
		isLoading,
		error,
		isFetched, // Add this to track if the query has been fetched at least once
	} = useQuery<AnimeResult[]>({
		queryKey: ["animeSearch", trimmedQuery], // Use trimmed query for consistency
		queryFn: async () => {
			if (!trimmedQuery) {
				return [];
			}
			// searchAnime is a server action that will talk to our API endpoint
			return searchAnime(trimmedQuery);
		},
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // Client-side cache for 5 minutes
		enabled: trimmedQuery !== "", // Only run query when there's a non-empty trimmedQuery
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
	// Show empty state with improved messaging and visual design
	// Modified condition to ensure it works properly
	if (isFetched && trimmedQuery !== "" && (!results || results.length === 0)) {
		return (
			<div className={`w-full ${className} py-8`}>
				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-sm text-center transition-all duration-300 hover:shadow-md">
					<div className="flex flex-col items-center space-y-4">
						{/* Empty state icon with subtle animation */}
						<div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mb-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-blue-500 dark:text-blue-300 animate-pulse"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>

						<div>
							<p className="text-blue-700 dark:text-blue-300 font-medium text-lg">
								No results found for &quot;{trimmedQuery}&quot;
							</p>
							<p className="text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
								We couldn&apos;t find any anime matching your search. Our API
								rate limit may have been reached.
							</p>
							<p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
								Try again later or come back tomorrow when limits refresh.
							</p>
						</div>

						{/* Suggestion buttons */}
						<div className="pt-3 flex flex-wrap gap-2 justify-center">
							<Link
								href="/"
								className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-sm rounded-full border border-blue-200 dark:border-blue-800 transition-colors duration-200"
							>
								Back to home
							</Link>
							<button
								onClick={() => window.location.reload()}
								className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-blue-700 dark:text-blue-300 text-sm rounded-full transition-colors duration-200"
								aria-label="Try again"
							>
								Try again
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Show search results
	return (
		<div className={`w-full ${className}`}>
			<div className="lg:py-7 py-2">
				<h2 className="text-[2rem] font-bold">Telegram Channel Links</h2>
			</div>
			{trimmedQuery !== "" && results.length > 0 && (
				<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
					Showing {results.length} results for &quot;{trimmedQuery}&quot;
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
										"https://banner2.cleanpng.com/20180910/jxc/kisspng-portable-network-graphics-telegram-computer-icons-1713942114742.webp";

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
