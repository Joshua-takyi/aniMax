import ConnectDb from "@/lib/connect";
import { getQueryModel } from "@/model/schema";
import axios, { AxiosError } from "axios";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

interface SearchResultItem {
	title: string;
	link?: string;
	formattedUrl?: string;
	snippet?: string;
	pagemap?: {
		cse_image?: Array<{ src: string }>;
		metatags?: Array<{ "og:image"?: string }>;
	};
	[key: string]: unknown; // Changed from 'any' to 'unknown' for better type safety
}

const createErrorResponse = (message: string, error: string, status: number) =>
	NextResponse.json({ message, error }, { status });

const extractImage = (item: SearchResultItem): string =>
	item.pagemap?.cse_image?.[0]?.src ||
	item.pagemap?.metatags?.[0]?.["og:image"] ||
	"https://via.placeholder.com/150";

export async function GET(req: Request) {
	try {
		const query = new URL(req.url).searchParams.get("q");
		if (!query)
			return createErrorResponse(
				"No search query provided",
				"Bad Request",
				400
			);

		if (mongoose.connection.readyState !== 1) await ConnectDb();

		const QueryModel = getQueryModel(query);
		const API_KEY = process.env.GOOGLE_API_KEY;
		const CSE_ID = process.env.CSE_ID;

		if (!API_KEY || !CSE_ID)
			return createErrorResponse(
				"API configuration missing",
				"Server Error",
				500
			);

		// Check for cached results first
		const count = await QueryModel.countDocuments();
		if (count > 0) {
			const results = await QueryModel.find({}).limit(20);
			return NextResponse.json({ data: results }, { status: 200 });
		}

		// Fetch from Google Search API if no cached results
		try {
			// Request first page of results (1-10)
			const fetchResults = async (start = 1) => {
				const params = new URLSearchParams({
					q: query,
					key: API_KEY,
					cx: CSE_ID,
					num: "10",
					...(start > 1 && { start: start.toString() }),
				});

				const res = await axios.get(
					`https://www.googleapis.com/customsearch/v1?${params.toString()}`,
					{
						headers: { Accept: "application/json" },
						timeout: 10000,
					}
				);

				return res.data.items || [];
			};

			// Fetch both pages in parallel for better performance
			const [firstPageItems, secondPageItems] = await Promise.all([
				fetchResults(1),
				fetchResults(11).catch(() => []), // Still continue if second page fails
			]);

			// Process all valid search results
			const allItems = [...firstPageItems, ...secondPageItems];
			if (!allItems.length) {
				return NextResponse.json(
					{ data: [], message: "No results found" },
					{ status: 200 }
				);
			}

			const processedResults = allItems
				.filter((item) => item?.title && (item.formattedUrl || item.link))
				.map((item) => ({
					title: item.title,
					slug: slugify(item.title, { lower: true, strict: true }),
					url: item.formattedUrl || item.link,
					image: extractImage(item),
				}));

			// Store results in database for future queries
			if (processedResults.length) {
				await QueryModel.bulkWrite(
					processedResults.map((result) => ({
						insertOne: { document: result },
					})),
					{ ordered: false }
				).catch((err) =>
					console.warn("Some results failed to cache:", err.message)
				);
			}

			return NextResponse.json({ data: processedResults }, { status: 200 });
		} catch (apiError) {
			const errorMessage =
				apiError instanceof AxiosError
					? `API Error: ${apiError.response?.status || 500}`
					: "Search API failure";

			return createErrorResponse(
				errorMessage,
				String(apiError),
				apiError instanceof AxiosError ? apiError.response?.status || 500 : 500
			);
		}
	} catch (error) {
		return createErrorResponse("Internal Server Error", String(error), 500);
	}
}
