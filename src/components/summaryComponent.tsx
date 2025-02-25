"use client";
import Image from "next/image";
import { useState } from "react";

interface SummaryComponentProps {
	image: string;
	status: string;
	episodes: number;
	type: string;
	studios: string[];
	released: string;
	englishTitle: string;
	japaneseTitle: string;
	synopsis: string;
	rating: string; // Added rating
	genres: string[]; // Added genres
}

export default function SummaryComponent({
	image,
	status,
	episodes,
	type,
	studios,
	released,
	englishTitle,
	japaneseTitle,
	synopsis,
	rating, // Added rating
	genres, // Added genres
}: Readonly<SummaryComponentProps>) {
	const [isExpanded, setIsExpanded] = useState(false);
	const truncatedLength = 200;

	const handleToggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="w-full overflow-hidden">
			<div className="flex flex-col md:flex-row">
				{/* Image section - fixed width on desktop, full width on mobile */}
				<div className="relative w-full md:w-64 h-80 md:h-auto shrink-0 aspect-square">
					<Image
						src={image}
						alt={englishTitle}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 256px"
						priority
					/>
				</div>

				{/* Content section */}
				<div className="flex-1 p-4 md:p-6 flex flex-col">
					{/* Titles */}
					<div className="mb-4">
						<h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
							{englishTitle}
						</h1>
						<h2 className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
							{japaneseTitle}
						</h2>
					</div>

					{/* Metadata - grid for medium screens and up, stacked for small screens */}
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm mb-4">
						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Status
							</span>
							<span>{status}</span>
						</div>
						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Episodes
							</span>
							<span>{episodes}</span>
						</div>
						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Released
							</span>
							<span>{released}</span>
						</div>
						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Studio
							</span>
							<span>{studios.join(", ")}</span>
						</div>
						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Type
							</span>
							<span>{type}</span>
						</div>

						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Rating
							</span>
							<span>{rating}</span>
						</div>
						<div className="flex flex-col">
							<span className="font-medium text-gray-500 dark:text-gray-400">
								Genres
							</span>
							<span>{genres.join(", ")}</span>
						</div>
					</div>

					{/* Synopsis with expand/collapse functionality */}
					<div className="mt-auto">
						<h3 className="font-medium text-gray-900 dark:text-white mb-2">
							Synopsis
						</h3>
						<p className="text-gray-700 dark:text-gray-300 text-sm text-pretty">
							{isExpanded
								? synopsis
								: `${synopsis.slice(0, truncatedLength)}${
										synopsis.length > truncatedLength ? "..." : ""
								  }`}
						</p>
						{synopsis.length > truncatedLength && (
							<button
								onClick={handleToggleExpand}
								className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium focus:outline-none cursor-pointer transition-all"
							>
								{isExpanded ? "Collapse" : "Load more"}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
