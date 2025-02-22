import axios, { AxiosError } from "axios";
const API_URL = process.env.API_URL;
export async function GetMovies() {
	try {
		const res = await axios.get(`${API_URL}/anime?type=movie`);
		if (res.status === 200) {
			return {
				success: true,
				data: res.data,
			};
		}
		return {
			success: false,
			message: "Something went wrong",
		};
	} catch (error) {
		if (axios.AxiosError) {
			const axiosError = error as AxiosError<{ message: string }>;
			let errorMessage = "An error occurred";
			if (axiosError.response?.data.message) {
				errorMessage = axiosError.response.data.message;
				return {
					success: false,
					message: errorMessage,
				};
			}
		}
		const errorMessage = "An error occurred";
		return {
			success: false,
			message: errorMessage,
		};
	}
}
