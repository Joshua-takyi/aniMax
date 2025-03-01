"use client";
import { FindBySearch, MovieProps } from "@/action";
import Loader from "@/app/loading";
import { CardComponent } from "@/components/itemsCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * Search page component that fetches and displays search results
 *
 * ! Fixed: Added proper error handling and empty states
 * * Generated by Copilot
 * ! Updated: Fixed TypeScript error with useQuery implementation
 */
export default function Page() {
	const searchParams = useSearchParams();
	const searchData = searchParams.get("q") || "";
	const types = searchParams.get("tv,movies") || "";
	const [hasError, setHasError] = useState(false);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["search", searchData, types],
		queryFn: async () => {
			// Only perform search if we have a non-empty query
			if (!searchData.trim()) {
				return [];
			}

			const res = await FindBySearch({
				search: searchData,
				type: types,
			});
			return res.data;
		},
		// Don't attempt to retry failed queries to prevent rate limiting issues
		retry: 1,
	});

	// Update error state when query fails
	if (isError && !hasError) {
		setHasError(true);
	}

	// Handle loading state
	if (isLoading) return <Loader />;

	// Handle error state
	if (hasError) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
				<h2 className="text-xl font-bold mb-2">Search Error</h2>
				<p className="mb-4">
					Sorry, we couldn&apos;t complete your search. Please try again later.
				</p>
			</div>
		);
	}

	// Handle empty results
	if (!data || data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
				<h2 className="text-xl font-bold mb-2">No Results Found</h2>
				<p className="mb-4">Try adjusting your search terms or filters.</p>
			</div>
		);
	}

	return (
		<main>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{data.map((item: MovieProps, index: number) => (
					<CardComponent
						key={`${item.mal_id}-${index}`}
						title={item.title}
						rating={item.rating}
						imageUrl={item.images.webp.large_image_url}
						id={item.mal_id}
					/>
				))}
			</section>
		</main>
	);
}
