"use client";
import Loader from "@/app/loading";
import { GetAnimeEpisodesById } from "@/action";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for better UI

interface EpisodeProps {
	mal_id: number;
	filler: boolean;
	title?: string;
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

	// Handler with debugging to ensure function is being called
	const handleToggleShowAll = () => {
		console.log("Toggle clicked, current state:", showAll);
		setShowAll((prevState) => !prevState);
	};

	if (isLoading) return <Loader />;
	if (!data || data.length === 0)
		return (
			<div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-center shadow-sm">
				<p className="text-lg font-medium">No episodes available</p>
				<p className="text-sm text-muted-foreground mt-1">
					Check back later for updates
				</p>
			</div>
		);

	return (
		<section className="w-full py-4">
			{/* Enhanced legend for filler indicators */}
			{hasFillers && (
				<div className="flex flex-wrap items-center gap-6 mb-6 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg shadow-sm">
					<h3 className="text-base font-semibold w-full md:w-auto mb-2 md:mb-0">
						Episode Guide:
					</h3>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-primary rounded-full shadow-md shadow-primary/30"></div>
						<span className="text-sm font-medium">Filler Episode</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full shadow-sm"></div>
						<span className="text-sm font-medium">Regular Episode</span>
					</div>
				</div>
			)}

			{/* Episodes grid with improved styling */}
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 md:gap-4">
					{visibleEpisodes?.map((episode: EpisodeProps) => (
						<div
							key={episode.mal_id}
							className={`relative overflow-hidden col-span-1 sm:col-span-2 p-4 rounded-lg shadow-sm border backdrop-blur-sm flex justify-center items-center 
                            ${
															episode.filler
																? "bg-primary/90 text-primary-foreground border-primary/30"
																: "bg-card/80 hover:bg-card border-border"
														} 
                            transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group`}
						>
							<div className="text-center w-full">
								<p className="font-semibold text-lg md:text-xl">
									{episode.mal_id}
								</p>
								{episode.title && (
									<p className="text-xs mt-1 truncate opacity-80 group-hover:opacity-100 hidden sm:block">
										{episode.title}
									</p>
								)}
								{episode.filler && (
									<div className="absolute top-1 right-1 bg-primary-foreground/20 rounded-full text-[10px] px-1.5 py-0.5">
										Filler
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Enhanced toggle button for better mobile compatibility */}
			{data?.length > initialLimit && (
				<div className="flex justify-center mt-8">
					<button
						className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 font-medium
                      flex items-center gap-2 transition-all duration-300 hover:shadow-md active:scale-95 group
                      relative z-10 min-h-[48px] touch-manipulation"
						onClick={handleToggleShowAll}
						onTouchEnd={(e) => {
							e.preventDefault(); // Prevent default to avoid double-firing
							handleToggleShowAll();
						}}
						aria-label={showAll ? "Show fewer episodes" : "Show all episodes"}
					>
						{showAll ? (
							<>
								<span>Show Less</span>
								<ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
							</>
						) : (
							<>
								<span>Show All Episodes</span>
								<span className="inline-flex items-center justify-center bg-secondary-foreground/20 text-sm rounded-full w-7 h-7 ml-1">
									{data.length}
								</span>
								<ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
							</>
						)}
					</button>
				</div>
			)}

			{/* Total episode count display */}
			<div className="mt-6 text-center">
				<p className="text-sm text-muted-foreground">
					Total episodes: <span className="font-medium">{data.length}</span>
				</p>
			</div>
		</section>
	);
}
