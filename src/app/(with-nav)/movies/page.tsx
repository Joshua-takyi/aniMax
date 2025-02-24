"use client";
// Import necessary dependencies
import { GetMovies } from "@/action";
import Loader from "@/app/loading";
import { CardComponent } from "@/components/itemsCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function Series() {
	const searchParams = useSearchParams();
	const genre = searchParams.get("genre") ?? "";
	const rating = searchParams.get("rating") ?? "";
	const status = searchParams.get("status") ?? "";

	const { data, isLoading } = useQuery({
		queryKey: ["movies", genre, rating, status],
		queryFn: async () => {
			const res = await GetMovies({
				type: "movie",
				genre,
				rating,
				status,
				page: 1,
			});
			return res.data;
		},
	});

	if (!data || data.length === 0) {
		return <div>no data found</div>;
	}
	if (isLoading) return <Loader />;

	// Render the movie grid
	return (
		<main>
			<h1 className="text-4xl font-bold mb-10">Movies</h1>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{data.map((item) => (
					<CardComponent
						key={item.mal_id}
						title={item.title}
						rating={item.rating}
						imageUrl={item.images.webp.large_image_url}
						id={item.mal_id}
					/>
				))}
			</section>
		</main>
	);
}
