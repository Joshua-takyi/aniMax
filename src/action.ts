// Import any required libraries
import { cache } from "react";

// Cache the fetch request at the server level
const fetchWithCache = cache(async (url: string) => {
	const response = await fetch(url, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		next: { revalidate: 3600 }, // Revalidate once per hour
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.status}`);
	}

	return response.json();
});

export async function GetAnimeRecommendationsById({
	animeId,
}: {
	animeId: string;
}) {
	try {
		const data = await fetchWithCache(
			`https://api.jikan.moe/v4/anime/${animeId}/recommendations`
		);
		return { data: data.data || [] };
	} catch (error) {
		console.error("Error fetching anime recommendations:", error);
		return { data: [] };
	}
}

// Add additional export for prefetch functionality
export const prefetchRecommendations = async (animeIds: string[]) => {
	return Promise.allSettled(
		animeIds.map((id) =>
			fetchWithCache(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
		)
	);
};
