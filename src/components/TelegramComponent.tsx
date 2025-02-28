"use client";
import { GetTelegramLinks } from "@/action";
import Loader from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TelegramComponent() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");
	const { data, isLoading } = useQuery({
		queryKey: ["Telegram", query],
		queryFn: async () => {
			const res = await GetTelegramLinks({
				queryData: query as string,
			});
			return res.data;
		},
	});
	if (isLoading) return <Loader />;
	if (!data || data.length === 0) return <div>no data</div>;

	const items = data.items;
	return (
		<div>
			<h1>Telegram Links</h1>
			{Array.isArray(items) &&
				items.map((item, index) => (
					<Link href={item.formattedUrl} key={`${item.title}-${index}`}>
						<TelegramCard
							// key={`${item.title}-${index}`}
							imageUrl={item.metatags["og:image"]}
							text={item.title}
						/>
					</Link>
				))}
		</div>
	);
}

const TelegramCard = ({
	imageUrl,
	text,
}: {
	imageUrl: string;
	text: string;
}) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-4">
			<Image src={imageUrl} alt="telegram" width={70} height={50} />
			<div className="flex flex-col gap-3">
				<p className="text-sm text-muted">{text}</p>
			</div>
		</div>
	);
};

// fuck vcode for lagging ... fuck copilot
