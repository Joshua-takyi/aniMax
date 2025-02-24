"use client";

import { FindBySearch, MovieProps } from "@/action";
import Loader from "@/app/loading";
import { CardComponent } from "@/components/itemsCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function Page() {
	const searchParams = useSearchParams();
	const searchData = searchParams.get("q");

	const { data, isLoading } = useQuery({
		queryKey: ["search", searchData],
		queryFn: async () => {
			const res = await FindBySearch({
				search: searchData ?? "",
			});
			return res.data;
		},
	});
	if (!data || data.length === 0) return null;
	if (isLoading) return <Loader />;

	return (
		<main>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{data.map((item: MovieProps) => (
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
