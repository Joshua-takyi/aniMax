import Image from "next/image";
import Link from "next/link";

export interface CardProps {
	className?: string;
	title: string;
	rating: string;
	imageUrl: string;
	id: number;
}

export function CardComponent({
	title,
	rating,
	imageUrl,
	id,
	className,
}: Readonly<CardProps>) {
	const getRatingLabel = (rating: string) => {
		if (rating.includes("R -") || rating.includes("R+")) return "18+";
		if (rating.includes("PG-13")) return "13+";
		if (rating.includes("PG")) return "7+";
		return "PG";
	};

	return (
		<Link
			href={`/profile/${id}`}
			className={`group relative aspect-[2/3] overflow-hidden ${className}`}
		>
			<div className="absolute inset-0">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-110"
				/>
			</div>
			<div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-sm font-bold text-white">
				{getRatingLabel(rating)}
			</div>
			<div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/70 p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
				<h3 className="text-lg font-bold">{title}</h3>
			</div>
		</Link>
	);
}
