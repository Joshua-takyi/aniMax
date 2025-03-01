import mongoose from "mongoose";

// Interface defining the search result document structure

// Collection name sanitization - MongoDB has restrictions on collection names

// Define result schema for anime search results
const resultSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		url: { type: String, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true }
);

/**
 * Dynamically generates a model for a specific query
 * This creates/accesses a separate collection for each search query
 *
 * @param query - The search query to create a model for
 * @returns A mongoose model for the specific query collection
 */
export function getQueryModel(query: string) {
	// Sanitize the query to create a valid MongoDB collection name
	const collectionName = query
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "_") // Replace non-alphanumeric chars with underscore
		.replace(/^_+|_+$/g, "") // Remove leading/trailing underscores
		.substring(0, 60); // Limit collection name length

	// Add prefix to avoid collection name conflicts
	const prefixedName = `anime_${collectionName}`;

	// Check if model already exists to prevent mongoose overwrite warning
	return (
		mongoose.models[prefixedName] ||
		mongoose.model(prefixedName, resultSchema, prefixedName)
	);
}
