"use client";
import Loader from "@/app/loading";
import { GetAnimeEpisodesById } from "@/action";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface EpisodeProps {
	mal_id: number;
	filler: boolean;
}

export default function EpisodesComponent({ id }: { id: string }) {
	const [hasFillers, setHasFillers] = useState(false);
	const initialLimit = 30;
	const [showAll, setShowAll] = useState(false);

	// Fetch episodes data with React Query
	const { data, isLoading } = useQuery({
		queryKey: ["episodes", id],
		queryFn: async () => {
			const res = await GetAnimeEpisodesById({
				animeId: id,
			});
			return res.data || [];
		},
		enabled: !!id,
	});

	// Check if there are any filler episodes
	useEffect(() => {
		if (data && data.length > 0) {
			const fillerEpisodes = data.filter(
				(episode: EpisodeProps) => episode.filler === true
			);
			setHasFillers(fillerEpisodes.length > 0);
		}
	}, [data]);

	// Apply episode limit unless showAll is true
	const visibleEpisodes =
		showAll || !initialLimit ? data : data?.slice(0, initialLimit);

	if (isLoading) return <Loader />;
	if (!data || data.length === 0)
		return <div className="p-4 rounded-lg">No episodes available</div>;

	return (
		<section className="w-full">
			{/* Legend for filler indicators */}
			{hasFillers && (
				<div className="flex items-center gap-4 mb-4 text-sm">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-primary rounded-full"></div>
						<span>Filler Episode</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
						<span>Regular Episode</span>
					</div>
				</div>
			)}

			{/* Episodes grid - Using CSS transitions for better performance */}
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 transition-opacity duration-300 ease-in-out">
					{visibleEpisodes?.map((episode: EpisodeProps) => (
						<div
							key={episode.mal_id}
							className={`col-span-2 p-3 rounded-lg shadow-sm border flex justify-center items-center transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg ${
								episode.filler
									? "bg-primary text-primary-foreground"
									: "bg-card border-border"
							}`}
						>
							<div className="text-center">
								<p className="font-medium text-sm">{episode.mal_id}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Simple toggle button without complex animations */}
			{data.length > initialLimit && (
				<div className="flex justify-center mt-4">
					<button
						className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 text-sm transition-transform duration-200 hover:scale-105 active:scale-95"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? "Show Less" : `Show All (${data.length})`}
					</button>
				</div>
			)}
		</section>
	);
}
