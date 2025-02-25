"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface GenreProps {
	mal_id: number;
	name: string;
}

interface GenreBtnsProps {
	data: GenreProps[];
	contentType?: "anime" | "manga" | "movies" | "tv";
}

export default function GenreBtns({
	data,
	contentType = "anime",
}: GenreBtnsProps) {
	const searchParams = useSearchParams();
	const currentGenre = searchParams.get("genre");
	const [showAll, setShowAll] = useState(false);

	// Determine how many genres to show initially based on screen size
	// Will be controlled via CSS media queries
	const initialVisibleCount = 5;
	const displayedGenres = showAll ? data : data.slice(0, initialVisibleCount);

	// Generate the correct path based on contentType
	const getGenrePath = (genreId: number) => {
		switch (contentType) {
			case "movies":
				return `/Movies?genre=${genreId}`;
			case "tv":
				return `/tv?genre=${genreId}`;
			case "manga":
				return `/manga?genre=${genreId}`;
			case "anime":
			default:
				return `/anime?genre=${genreId}`;
		}
	};

	return (
		<div className="w-full overflow-hidden">
			{/* Genre chips with horizontal scrolling on small screens */}
			<div className="flex flex-wrap gap-2 py-4 max-w-full">
				{displayedGenres.map((genre) => (
					<Link
						href={getGenrePath(genre.mal_id)}
						key={genre.mal_id}
						className={`
              rounded-md px-3 py-2 text-sm border border-primary
              transition-all duration-200 hover:bg-primary hover:text-black
              whitespace-nowrap flex-shrink-0
              ${
								currentGenre === genre.mal_id.toString()
									? "bg-primary text-black"
									: ""
							}
            `}
					>
						{genre.name}
					</Link>
				))}

				{/* Show toggle button only if there are more genres than the initial count */}
				{data.length > initialVisibleCount && (
					<button
						onClick={() => setShowAll(!showAll)}
						className="rounded-md px-3 py-2 text-sm border border-primary
                     transition-all duration-200 hover:bg-primary hover:text-black whitespace-nowrap"
					>
						{showAll
							? "Show Less"
							: `+${data.length - initialVisibleCount} More`}
					</button>
				)}
			</div>
		</div>
	);
}
