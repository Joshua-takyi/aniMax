import { Metadata } from "next";
import { HeroSection } from "./hero";

// Define metadata for improved SEO
export const metadata: Metadata = {
	title: "Animax - Search and Download Anime via Telegram",
	description:
		"Find your favorite anime series and movies with direct access to Telegram download links. The ultimate anime search engine.",
	keywords:
		"anime, download anime, telegram anime, anime search engine, animax",
	openGraph: {
		title: "Animax - Your Ultimate Anime Search Engine",
		description:
			"Search, discover and download your favorite anime series through Telegram links",
		images: [
			{
				url: "/images/hero.jpg",
				width: 1200,
				height: 630,
				alt: "Animax - Anime Search Engine",
			},
		],
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Animax - Search and Download Anime",
		description:
			"Find and download your favorite anime series with Telegram links",
		images: ["/images/hero.jpg"],
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: "/",
	},
	metadataBase: new URL("https://ani-max-seven.vercel.app/"), // Replace with your actual domain
};

export default function Home() {
	return <HeroSection />;
}
