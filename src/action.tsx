"use server";
import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define the MovieProps interface
export interface MovieProps {
	rating: string;
	title: string;
	mal_id: number;
	images: {
		webp: {
			large_image_url: string;
		};
	};
}

// Function to fetch movies with pagination support
export async function GetMovies({
	genre,
	rating,
	status,
	page,
	type,
}: {
	page: number;
	type: string;
	genre?: string;
	rating?: string;
	status?: string;
}): Promise<{ success: boolean; data: MovieProps[] }> {
	try {
		const res = await axios.get(`${API_URL}/anime`, {
			params: {
				type: type,
				page,
				genre: genre,
				min_score: rating,
				status: status,
				limit: 18,
				order_by: "popularity",
			},
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.status === 200) {
			return {
				success: true,
				data: res.data.data,
			};
		}

		return {
			success: false,
			data: [],
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 429) {
				throw new Error("rate-limited");
			}
			throw new Error(
				error.response?.data?.message || "Failed to fetch movies"
			);
		}
		throw error;
	}
}

export async function FindBySearch({ search }: { search: string }) {
	try {
		const res = await axios.get(`${API_URL}/anime?`, {
			params: {
				q: search,
				limit: 18,
				order_by: "popularity",
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.status === 200) {
			return {
				success: true,
				data: res.data.data,
				message: "data fetched successfully",
			};
		}
		throw new Error("failed to get Data");
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 429) {
				throw new Error("rate-limited");
			}
			throw new Error(
				error.response?.data?.message || "Failed to fetch movies"
			);
		}
		throw error;
	}
}

export async function GetAnimeById({ id }: { id: string }) {
	try {
		const res = await axios.get(`${API_URL}/anime/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.status === 200) {
			return {
				success: true,
				data: res.data,
				message: "data fetched successfully",
			};
		}
		throw new Error("failed to get data");
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 429) {
				throw new Error("rate-limited");
			}
			throw new Error(
				error.response?.data?.message || "Failed to fetch movies"
			);
		}
		throw error;
	}
}
