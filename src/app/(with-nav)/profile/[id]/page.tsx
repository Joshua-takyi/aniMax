"use client";

import { GetAnimeById } from "@/action";
import Loader from "@/app/loading";
// import VideoSection from "@/components/videoSection";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface AnimeData {
	trailer: {
		youtube_id: string;
	};
	// Add other anime data properties as needed
}

export default function ProfilePage() {
	const params = useParams();
	const id = params.id as string;

	const { data, isLoading, error } = useQuery({
		queryKey: ["AnimeId", id],
		queryFn: async () => {
			const response = await GetAnimeById({ id });
			return response.data.data as AnimeData;
		},
		enabled: !!id, // Only run query if id exists
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<p className="text-red-500">Error loading anime data</p>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<p className="text-gray-500">No data found</p>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="w-full videoContainer">
				{data.trailer && data.trailer.youtube_id ? (
					<iframe
						width="960"
						allowFullScreen
						height="500"
						src={`https://www.youtube.com/embed/${data.trailer.youtube_id}?enablejsapi=1&wmode=opaque&autoplay=1`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						// referrerpolicy="strict-origin-when-cross-origin"
						// allowfullscreen
					></iframe>
				) : (
					<div className="flex justify-center items-center min-h-[315px] bg-gray-100 rounded-lg">
						<p className="text-gray-500">No video available</p>
					</div>
				)}
			</div>
			{data.trailer && data.trailer.youtube_id && (
				<p className="text-4xl text-red-500">{data.trailer.youtube_id}</p>
			)}
		</main>
	);
}
