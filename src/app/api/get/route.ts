import ConnectDb from "@/lib/connect";
import { getQueryModel } from "@/model/schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// This endpoint will only return cached results for a query
export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const query = url.searchParams.get("q");

		if (!query) {
			return NextResponse.json(
				{ error: "No query parameter provided" },
				{ status: 400 }
			);
		}

		// Connect to DB if not connected
		if (mongoose.connection.readyState !== 1) await ConnectDb();

		// Get the model for this specific query
		const QueryModel = getQueryModel(query);

		// Optional pagination parameters
		const page = parseInt(url.searchParams.get("page") || "1");
		const limit = parseInt(url.searchParams.get("limit") || "20");
		const skip = (page - 1) * limit;

		// Get count for pagination info
		const totalCount = await QueryModel.countDocuments();

		if (totalCount === 0) {
			return NextResponse.json(
				{
					data: [],
					pagination: {
						total: 0,
						page,
						limit,
						pages: 0,
					},
					message: "No cached results found for this query",
				},
				{ status: 200 }
			);
		}

		// Fetch the cached results
		const results = await QueryModel.find({}).skip(skip).limit(limit).lean();

		return NextResponse.json(
			{
				data: results,
				pagination: {
					total: totalCount,
					page,
					limit,
					pages: Math.ceil(totalCount / limit),
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching cached query:", error);
		return NextResponse.json(
			{ error: "Failed to fetch cached query results", details: String(error) },
			{ status: 500 }
		);
	}
}
