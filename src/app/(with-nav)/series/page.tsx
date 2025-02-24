import { GetMovies } from "@/action";
import { CardComponent } from "@/components/itemsCard";

export default async function Series() {
	const data = await GetMovies({
		type: "tv",
		page: 1,
	});
	return (
		<main>
			<h1 className="text-4xl font-bold mb-10">Tv series</h1>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{data.data.map((item) => (
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
