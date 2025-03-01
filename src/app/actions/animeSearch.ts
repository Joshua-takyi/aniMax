"use server";

/**
 * Action file to handle anime search queries by connecting to the search API
 * This provides a reusable function to fetch anime data from our backend
 */

/**
 * Server action that fetches anime search results from the API
 * The API handles database caching internally
 */
export async function searchAnime(query: string) {
	if (!query || query.trim() === "") {
		return [];
	}

	try {
		// Get the base URL for API requests
		// In server components/actions, we must use absolute URLs for fetch
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

		// Ensure we have a properly formatted absolute URL by creating a URL object
		const apiUrl = new URL("/api/search", baseUrl);

		// Safely add the search query as a parameter
		apiUrl.searchParams.append("q", query);

		console.log(`Fetching anime data from: ${apiUrl.toString()}`);

		// Make the request with the properly formatted URL
		const response = await fetch(apiUrl.toString(), {
			cache: "no-store", // Always get fresh results to respect our internal caching logic
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error("Search API error:", errorData);
			throw new Error(
				errorData?.message ||
					`Failed to search anime (status: ${response.status})`
			);
		}

		const data = await response.json();
		return data.data || [];
	} catch (error) {
		console.error("Error in searchAnime action:", error);
		return [];
	}
}
