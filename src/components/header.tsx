import { Star } from "lucide-react";

interface MovieHeaderProps {
	title: string;
	originalTitle: string;
	year: string;
	rating: string;
	duration: string;
	imdbRating: number;
	votes: number;
	popularity: number;
}

export default function MovieHeader({
	title,
	originalTitle,
	year,
	rating,
	duration,
	imdbRating,
	votes,
	popularity,
}: Readonly<MovieHeaderProps>) {
	return (
		<div className=" py-4 w-full">
			<div className="flex flex-col">
				{/* Title section */}
				<h1 className="text-4xl font-bold mb-1">{title}</h1>
				<div className="text-sm mb-1">Original title: {originalTitle}</div>

				{/* Movie details */}
				<div className="flex items-center gap-2 text-sm mb-4">
					<span>{year}</span>
					<span>•</span>
					<span>{rating}</span>
					<span>•</span>
					<span>{duration}</span>
				</div>

				{/* Ratings section */}
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div className="text-gray-400 uppercase text-sm"> RATING</div>
						<div className="text-gray-400 uppercase text-sm">YOUR RATING</div>
						<div className="text-gray-400 uppercase text-sm">POPULARITY</div>
					</div>

					<div className="flex items-center gap-6">
						{/* IMDb rating */}
						<div className="flex items-center">
							<Star
								className="text-yellow-400 w-6 h-6 mr-2"
								fill="currentColor"
							/>
							<div>
								<span className="font-bold text-xl">
									{imdbRating.toFixed(1)}
								</span>
								<span className="text-sm text-gray-400">/10</span>
							</div>
							<span className="text-sm text-gray-400 ml-1">
								{formatVotes(votes)}
							</span>
						</div>

						{/* User rating */}
						<div className="flex items-center">
							<Star
								className="text-blue-400 w-6 h-6 mr-1"
								stroke="currentColor"
								fill="transparent"
							/>
							<span className="text-blue-400">Rate</span>
						</div>

						{/* Popularity */}
						<div className="flex items-center">
							<div className="bg-green-600 rounded-full p-1 mr-1">
								<span className="text-white font-medium">{popularity}</span>
							</div>
							<span className="text-gray-400 text-sm">+89</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function formatVotes(votes: number): string {
	if (votes >= 1000) {
		return `${(votes / 1000).toFixed(0)}K`;
	}
	return votes;
}
