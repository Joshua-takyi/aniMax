"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface GenreProps {
	mal_id: number;
	name: string;
}

export default function GenreBtns({ data }: { data: GenreProps[] }) {
	const searchParams = useSearchParams();
	const searchTypes = searchParams.get("type") || "movies"; // Default to "movies" if not specified
	let searchData;

	if (searchTypes === "movies") {
		searchData = "Movies";
	} else {
		searchData = "tv";
	}

	return (
		<div className="flex gap-4 py-4">
			{data.map((i) => (
				<Link
					href={`/${searchData}?genre=${i.mal_id}`}
					key={i.mal_id}
					className="rounded-md p-2 border-[0.4px] hover:bg-primary  hover:text-black transition-all border-primary"
				>
					{i.name}
				</Link>
			))}
		</div>
	);
}
