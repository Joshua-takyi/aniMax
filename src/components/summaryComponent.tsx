import Image from "next/image";

interface SummaryComponent {
	image: {
		webp: {
			large_image_url: string;
		};
	};
	status: string;
	episodes: number;
	type: string;
	studio: string;
	released: string;
	englishTitle: string;
	japaneseTitle: string;
	synopsis: string;
}
export default function SummaryComponent({
	image,
	status,
	episodes,
	type,
	studio,
	released,
	englishTitle,
	japaneseTitle,
	synopsis,
}: Readonly<SummaryComponent>) {
	return (
		<section className="gri grid-cols-10">
			<div className="col-span-3 aspect-square p-2 relative">
				<Image
					src={image.webp.large_image_url}
					alt={englishTitle}
					fill
					objectFit="cover"
					priority={true}
				/>
			</div>
			<div className="col-span-7">
				<div className="flex flex-col gap-4 p-2">
					{/* titles */}
					<div className="flex gap-2">
						<span className="font-medium">{englishTitle}</span>
						<span className="text-sm text-ghost">{japaneseTitle}</span>
					</div>
					<ul className="grid grid-cols-2 gap-2">
						<li>status:{status}</li>
						<li>episodes:{episodes}</li>
						<li>released:{released}</li>
						<li>studio:{studio}</li>
						<li>type:{type}</li>
					</ul>
					<div className="max-w-max">
						<p>{synopsis}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
