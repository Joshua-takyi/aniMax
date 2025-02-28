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
export interface MovieProps {
	mal_id: number;
	title: string;
	rating: string;
	status: string;
	genres?: { mal_id: number; name: string }[];
	images: {
		webp: {
			large_image_url: string;
		};
	};
	// ... other properties as needed
}

export interface GetMoviesParams {
	page: number;
	type: string;
	genre?: string;
	rating?: string;
	status?: string;
	order_by?: string;
}

export async function GetMovies({
	genre,
	rating,
	status,
	page,
	type,
}: GetMoviesParams): Promise<{ success: boolean; data: MovieProps[] }> {
	try {
		// Map the rating values to match Jikan API's rating parameter
		const ratingMapping: { [key: string]: string } = {
			g: "g",
			pg: "pg",
			r17: "r17",
			r: "r",
			rx: "rx",
		};

		// Map the status values to match Jikan API's status parameter
		const statusMapping: { [key: string]: string } = {
			airing: "airing",
			finished: "complete",
			upcoming: "upcoming",
		};

		const res = await axios.get(`${API_URL}/anime`, {
			params: {
				type,
				page,
				limit: 15,
				order_by: "popularity",
				rating: rating ? ratingMapping[rating.toLowerCase()] : undefined,
				status: status ? statusMapping[status.toLowerCase()] : undefined,
				genres: genre ? String(genre) : undefined,
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

export async function FindBySearch({
	search,
	type,
}: {
	search: string;
	type: string;
}) {
	try {
		const res = await axios.get(`${API_URL}/anime?`, {
			params: {
				q: search,
				type,
				limit: 15,
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

export async function GetCharactersByAnimeId({ animeId }: { animeId: string }) {
	try {
		const res = await axios.get(`${API_URL}/anime/${animeId}/characters`, {
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
		console.log(res.data);
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

export async function GetAnimeStaffById({ animeId }: { animeId: string }) {
	try {
		const res = await axios.get(`${API_URL}/anime/${animeId}/staff`, {
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
		console.log(res.data);
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
export async function GetAnimeRecommendationsById({
	animeId,
}: {
	animeId: string;
}) {
	try {
		const res = await axios.get(`${API_URL}/anime/${animeId}/recommendations`, {
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
		console.log(res.data);
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

export async function GetFeaturedAnime() {
	try {
		const res = await axios.get(
			`${API_URL}/anime?status=airing&limit=18&order_by=popularity&type=tv`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (res.status === 200) {
			return {
				message: "data fetched successfully",
				success: true,
				data: res.data.data,
			};
		}
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
export async function GetTelegramLinks({ queryData }: { queryData: string }) {
	try {
		const res = await axios.get(
			`http://localhost:3000/api/search?q=${queryData}`
		);
		if (res.status === 200) {
			return {
				message: "data fetched successfully",
				success: true,
				data: res.data,
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
