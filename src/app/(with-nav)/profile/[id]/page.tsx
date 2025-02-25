"use client";

import { GetAnimeById } from "@/action";
import Loader from "@/app/loading";
import GenreBtns from "@/components/genre-components";
// import VideoSection from "@/components/videoSection";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

interface AnimeData {
	trailer: {
		youtube_id: string;
	};
	genres: {
		mal_id: number;
		name: string;
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
		<main className=" py-8">
			<div className="w-full relative  md:pb-[56.25%]">
				{data?.trailer.youtube_id ? (
					<iframe
						width="960"
						allowFullScreen
						height="500"
						src={`https://www.youtube.com/embed/${data.trailer.youtube_id}?enablejsapi=1&wmode=opaque&autoplay=1&rel=0`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						className="w-[100%] h-full absolute insert-0"
					></iframe>
				) : (
					<div className="flex justify-center items-center min-h-[315px] bg-gray-100 rounded-lg">
						<div className="flex h-[50dvh] justify-center items-center">
							<Image
								src="/assets/images/no-video.png"
								alt="No Image"
								width={400}
								height={400}
								className="w-full h-full object-contain  "
							/>
						</div>
					</div>
				)}
			</div>
			<section>
				{/* genre section */}
				{data?.genres && <GenreBtns data={data.genres} />}
			</section>
		</main>
	);
}
