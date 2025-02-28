import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetAnimeRecommendationsById } from "@/action";
import { DataProps } from "@/components/recommendationSidebar";

/**
 * Custom hook that fetches anime recommendations based on an anime ID
 *
 * @param animeId - The ID of the anime to get recommendations for
 * @param options - Optional React Query configuration options
 * @returns Query result object containing data, loading state, error state, and helper methods
 */
export function useAnimeRecommendations(
	animeId: string,
	options?: Omit<
		UseQueryOptions<DataProps[], Error, DataProps[], string[]>,
		"queryKey" | "queryFn"
	>
) {
	return useQuery({
		// Unique key for React Query cache identification
		queryKey: ["recommendation", animeId],
		// Function that fetches the data when the query is executed
		queryFn: async () => {
			const res = await GetAnimeRecommendationsById({ animeId });
			return res.data;
		},
		// Spread any additional options provided by the consumer
		...options,
	});
}
