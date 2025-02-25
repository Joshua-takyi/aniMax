"use client";

import { GetAnimeById } from "@/action";
import Loader from "@/app/loading";
import CharacterComponent from "@/components/charactersComponent";
import GenreBtns from "@/components/genre-components";
import SummaryComponent from "@/components/summaryComponent";
import VideoSection from "@/components/videoSection";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface AnimeData {
	mal_id: string;
	trailer: {
		youtube_id: string;
	};
	genres: {
		mal_id: number;
		name: string;
	}[];
	titles: {
		type: string;
		title: string;
	}[];
	images: {
		webp: {
			large_image_url: string;
		};
	};
	status: string;
	episodes: number;
	type: string;
	studios: [
		{
			name: string;
		}
	];
	aired: {
		string: string;
	};
	englishTitle: string;
	japaneseTitle: string;
	synopsis: string;
	rating: string;
	season: string;
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

	// Extract Japanese and English titles
	const japaneseTitle =
		data.titles.find((title) => title.type === "Japanese")?.title ?? "";
	const englishTitle =
		data.titles.find((title) => title.type === "English")?.title ?? "";

	return (
		<main className="py-8">
			{/* video section */}
			<VideoSection videoUrl={data.trailer.youtube_id} />
			<section>
				{/* Genre section */}
				{data.genres && <GenreBtns data={data.genres} />}
			</section>
			<section>
				{/* Summary section */}
				<SummaryComponent
					genres={data.genres.map((genre) => genre.name)}
					image={data.images.webp.large_image_url}
					status={data.status}
					episodes={data.episodes}
					type={data.type}
					studios={data.studios.map((studio) => studio.name)}
					released={data.aired.string}
					englishTitle={englishTitle}
					japaneseTitle={japaneseTitle}
					rating={data.rating}
					synopsis={data.synopsis}
				/>
			</section>
			<section className="md:py-12">
				{/* Character section */}
				<CharacterComponent id={data.mal_id} />
			</section>
		</main>
	);
}
