import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

// Helper for consistent error responses
const createErrorResponse = (
	message: string,
	error: string,
	status: number
) => {
	return NextResponse.json({ message, error }, { status });
};

export async function GET(req: Request) {
	try {
		// 1. Extract and validate query parameter
		const { searchParams } = new URL(req.url);
		const query = searchParams.get("q");

		if (!query) {
			return createErrorResponse(
				"Failed to process search request",
				"No query provided",
				400
			);
		}

		// 2. Validate environment variables
		const API_KEY = process.env.GOOGLE_API_KEY;
		const CSE_ID = process.env.CSE_ID;

		if (!API_KEY || !CSE_ID) {
			return createErrorResponse(
				"Server configuration error",
				"Missing API credentials",
				500
			);
		}

		// 3. Make API request
		const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
			query
		)}&key=${API_KEY}&cx=${CSE_ID}`;

		const response = await axios.get(url);
		return NextResponse.json({ items: response.data.items });
	} catch (error) {
		// 4. Handle errors with specific status codes
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;

			if (axiosError.response?.status === 403) {
				return createErrorResponse(
					"Failed to get search results",
					"Invalid API key or quota exceeded",
					403
				);
			}

			const errorMessage =
				(axiosError.response?.data as { error?: { message?: string } })?.error
					?.message || "API request failed";
			return createErrorResponse(
				"Failed to get search results",
				errorMessage,
				axiosError.response?.status || 500
			);
		}

		// 5. Handle general errors
		return createErrorResponse(
			"Failed to process search request",
			error instanceof Error ? error.message : "Unknown error",
			500
		);
	}
}
