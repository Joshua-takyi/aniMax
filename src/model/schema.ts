import mongoose, { Model, Schema, Document } from "mongoose";
import slugify from "slugify";

// Interface defining the search result document structure
interface SearchResult extends Document {
	title: string;
	image: string;
	slug: string;
	url: string;
	createdAt: Date;
	updatedAt: Date;
}

// Collection name sanitization - MongoDB has restrictions on collection names
const sanitizeCollectionName = (name: string): string => {
	// Convert to lowercase, remove special chars, limit length
	const sanitized = slugify(name, {
		lower: true,
		strict: true,
		replacement: "_",
	}).slice(0, 50); // MongoDB collection name limit is 64 bytes

	// Ensure the collection name starts with a letter or underscore
	return /^[a-z]/.test(sanitized) ? sanitized : `anime_${sanitized}`;
};

// Search result schema definition
const searchResultSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Cache for already created models to prevent recreation
const modelCache: Record<string, Model<SearchResult>> = {};

// Function to get or create a model for a specific query
export function getQueryModel(query: string): Model<SearchResult> {
	const collectionName = sanitizeCollectionName(query);

	// If model already created, return from cache
	if (modelCache[collectionName]) {
		return modelCache[collectionName];
	}

	// Check if model exists in mongoose.models
	if (mongoose.models[collectionName]) {
		modelCache[collectionName] = mongoose.models[
			collectionName
		] as Model<SearchResult>;
		return modelCache[collectionName];
	}

	// Create new model if it doesn't exist
	const model = mongoose.model<SearchResult>(
		collectionName,
		searchResultSchema
	);
	modelCache[collectionName] = model;

	return model;
}
