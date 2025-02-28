/**
 * Query Persistence Configuration
 *
 * This file configures React Query to persist cached data in the browser's localStorage.
 *
 * PURPOSE:
 * - Provides offline support by caching API responses
 * - Prevents unnecessary refetching of data when users refresh the page
 * - Improves perceived performance by showing cached data before refreshing
 * - Reduces API calls to backend services
 *
 * WHEN TO USE:
 * - Include this in your app's initialization to enable persistence
 * - Particularly useful in applications where data doesn't change frequently
 * - Beneficial for improving user experience in areas with poor connectivity
 *
 * Note: The persistence is configured with a 24-hour expiry to ensure data
 * eventually refreshes and doesn't stay stale indefinitely.
 */
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { queryClient } from "./reactQueryConfig";

// Only set up persistence in browser environment to avoid SSR issues
if (typeof window !== "undefined") {
	// Create a persister that uses localStorage for storing query data
	const localStoragePersister = createSyncStoragePersister({
		storage: window.localStorage,
	});

	// Configure the query client to use persistence
	persistQueryClient({
		queryClient, // The React Query client instance
		persister: localStoragePersister, // Storage mechanism
		maxAge: 24 * 60 * 60 * 1000, // Cache expiry: 24 hours in milliseconds
		// This prevents very old data from being shown to users
	});
}
