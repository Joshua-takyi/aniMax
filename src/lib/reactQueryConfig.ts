import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 30 * 60 * 1000, // 30 minutes
			retry: 1,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
		},
	},
});

// Prefetch helper for common resources
export const prefetchAnimeRecommendations = async (animeIds: string[]) => {
	const promises = animeIds.map((id) =>
		queryClient.prefetchQuery({
			queryKey: ["recommendation", id],
			queryFn: async () => {
				const { GetAnimeRecommendationsById } = await import("@/action");
				const res = await GetAnimeRecommendationsById({ animeId: id });
				return res.data;
			},
		})
	);

	await Promise.all(promises);
};
