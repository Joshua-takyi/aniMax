import React from "react";
import { Star, Tag, Play } from "lucide-react";

interface FeaturedAnimeCardProps {
	title: string;
	image: string;
	rating: number;
	episodes: number | string;
	genres: string[];
}

const FeaturedAnimeCard = ({
	title,
	image,
	rating,
	episodes,
	genres,
}: FeaturedAnimeCardProps) => {
	// Format the genre string - take only the first genre if multiple exist
	const genre = genres && genres.length > 0 ? genres[0] : "Unknown";

	return (
		<div className="relative overflow-hidden rounded-lg group h-64 w-full">
			{/* Background image with hover effect */}
			<div
				className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
				style={{ backgroundImage: `url(${image})` }}
			/>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

			{/* Content */}
			<div className="absolute bottom-0 p-4 w-full">
				<h3 className="text-xl font-bold text-white mb-2">{title}</h3>

				{/* Rating and episode count */}
				<div className="flex items-center gap-2 mb-2">
					<Star className="w-4 h-4 text-yellow-400" />
					<span className="text-sm text-gray-200">{rating.toFixed(1)}</span>
					<span className="text-sm text-gray-300">•</span>
					<span className="text-sm text-gray-200">
						{typeof episodes === "number" && episodes >= 75
							? `${episodes}+`
							: episodes}{" "}
						episodes
					</span>
				</div>

				{/* Genre tags */}
				<div className="flex items-center gap-2">
					<Tag className="w-4 h-4 text-gray-300" />
					<span className="text-sm text-gray-200">{genre}</span>
				</div>

				{/* Watch button */}
				<button className="mt-3 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full transition-colors">
					<Play className="w-4 h-4 text-white" />
					<span className="text-sm font-medium text-white">Watch Now</span>
				</button>
			</div>
		</div>
	);
};

export default FeaturedAnimeCard;
