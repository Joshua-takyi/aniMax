export const animeGenres = [
	{ name: "Action", id: 1 },
	{ name: "Adventure", id: 2 },
	{ name: "Cars", id: 3 },
	{ name: "Comedy", id: 4 },
	{ name: "Avant Garde", id: 5 },
	{ name: "Mythology", id: 6 },
	{ name: "Mystery", id: 7 },
	{ name: "Drama", id: 8 },
	{ name: "Ecchi", id: 9 },
	{ name: "Fantasy", id: 10 },
	{ name: "Strategy Game", id: 11 },
	{ name: "Hentai", id: 12 },
	{ name: "Historical", id: 13 },
	{ name: "Horror", id: 14 },
	{ name: "Kids", id: 15 },
	{ name: "Martial Arts", id: 17 },
	{ name: "Mecha", id: 18 },
	{ name: "Music", id: 19 },
	{ name: "Parody", id: 20 },
	{ name: "Romance", id: 22 },
	{ name: "School", id: 23 },
	{ name: "Sci-Fi", id: 24 },
	{ name: "Shoujo", id: 25 },
	{ name: "Girls Love", id: 26 },
	{ name: "Shounen", id: 27 },
	{ name: "Boys Love", id: 28 },
	{ name: "Space", id: 29 },
	{ name: "Sports", id: 30 },
	{ name: "Super Power", id: 31 },
	{ name: "Vampire", id: 32 },
	{ name: "Harem", id: 35 },
	{ name: "Slice of Life", id: 36 },
	{ name: "Supernatural", id: 37 },
	{ name: "Military", id: 38 },
	{ name: "Detective", id: 39 },
	{ name: "Psychological", id: 40 },
	{ name: "Suspense", id: 41 },
	{ name: "Seinen", id: 42 },
	{ name: "Josei", id: 43 },
	// Note: IDs 44 and 45 are sometimes unused or reserved
	{ name: "Award Winning", id: 46 },
	{ name: "Gourmet", id: 47 },
	{ name: "Workplace", id: 48 },
	{ name: "Erotica", id: 49 },
	{ name: "Adult Cast", id: 50 },
	{ name: "Anthropomorphic", id: 51 },
	{ name: "CGDCT", id: 52 },
	{ name: "Childcare", id: 53 },
	{ name: "Combat Sports", id: 54 },
	{ name: "Delinquents", id: 55 },
	{ name: "Educational", id: 56 },
	{ name: "Gag Humor", id: 57 },
	{ name: "Gore", id: 58 },
	{ name: "High Stakes Game", id: 59 },
	{ name: "Idols (Female)", id: 60 },
	{ name: "Idols (Male)", id: 61 },
	{ name: "Isekai", id: 62 },
	{ name: "Iyashikei", id: 63 },
	{ name: "Love Polygon", id: 64 },
	{ name: "Magical Sex Shift", id: 65 },
	{ name: "Mahou Shoujo", id: 66 },
	{ name: "Medical", id: 67 },
	{ name: "Organized Crime", id: 68 },
	{ name: "Otaku Culture", id: 69 },
	{ name: "Performing Arts", id: 70 },
	{ name: "Pets", id: 71 },
	{ name: "Reincarnation", id: 72 },
	{ name: "Reverse Harem", id: 73 },
	{ name: "Love Status Quo", id: 74 },
	{ name: "Showbiz", id: 75 },
	{ name: "Survival", id: 76 },
	{ name: "Team Sports", id: 77 },
	{ name: "Time Travel", id: 78 },
	{ name: "Video Game", id: 79 },
	{ name: "Visual Arts", id: 80 },
	{ name: "Crossdressing", id: 81 },
	{ name: "Urban Fantasy", id: 82 },
	{ name: "Villainess", id: 83 },
];

export const categoryPillsData = [
	{
		id: 1,
		name: "Action",
	},
	{
		id: 2,
		name: "Adventure",
	},
	{
		id: 3,
		name: "Cars",
	},
	{
		id: 4,
		name: "Comedy",
	},
	{
		id: 5,
		name: "Avant Garde",
	},
	{
		id: 6,
		name: "Mythology",
	},
	{
		id: 7,
		name: "Mystery",
	},
	{
		id: 8,
		name: "Drama",
	},
	{
		id: 9,
		name: "Ecchi",
	},
	{
		id: 10,
		name: "Fantasy",
	},
];

/**
 * Enhanced ImagesSection with proper TypeScript interfaces and improved structure
 * This array contains image data for the anime gallery section
 * Each image is stored in the public directory and referenced with a relative path
 *
 * Generated by Copilot
 */

// Define a strict type for our image objects to ensure type safety
interface AnimeImage {
	id: number;
	image: string;
	title?: string;
	dimensions?: {
		width: number;
		height: number;
	};
	alt?: string;
}

// The main images collection with properly formatted paths
// All paths are relative to the public directory in Next.js
export const ImagesSection: AnimeImage[] = [
	{
		id: 1,
		image: "/images/sfk-01-1040x1560.original.jpg",
		title: "Shingeki no Kyojin",
		dimensions: { width: 1040, height: 1560 },
		alt: "Attack on Titan promotional poster",
	},
	{
		id: 2,
		image: "/images/wpg-01-1040x1560.original.jpg",
		title: "One Piece",
		dimensions: { width: 1040, height: 1560 },
		alt: "One Piece anime poster",
	},
	{
		id: 3,
		image: "/images/mog-01-1040x1560.original.jpg",
		title: "My Hero Academia",
		dimensions: { width: 1040, height: 1560 },
		alt: "My Hero Academia promotional image",
	},
	{
		id: 4,
		image: "/images/kjg-01-1560x2340.original.jpg",
		title: "Demon Slayer",
		dimensions: { width: 1560, height: 2340 },
		alt: "Demon Slayer key visual",
	},
	{
		id: 5,
		image: "/images/vig-01-1040x1560.original.jpg",
		title: "Violet Evergarden",
		dimensions: { width: 1040, height: 1560 },
		alt: "Violet Evergarden poster",
	},
	{
		id: 6,
		image: "/images/pgp-01-1040x1560.original.jpg",
		title: "Psycho-Pass",
		dimensions: { width: 1040, height: 1560 },
		alt: "Psycho-Pass promotional image",
	},
	{
		id: 7,
		image: "/images/tlr-01-1040x1560.original.jpg",
		title: "Tokyo Revengers",
		dimensions: { width: 1040, height: 1560 },
		alt: "Tokyo Revengers key visual",
	},
	{
		id: 8,
		image: "/images/gmg-01-1040x1560.original.jpg",
		title: "Gintama",
		dimensions: { width: 1040, height: 1560 },
		alt: "Gintama promotional poster",
	},
	{
		id: 9,
		image: "/images/pse-01-1040x1560-v1.original.jpg",
		title: "Promised Neverland",
		dimensions: { width: 1040, height: 1560 },
		alt: "The Promised Neverland visual",
	},
	{
		id: 10,
		image: "/images/mli-01-1560x2340.original.jpg",
		title: "My Love Story",
		dimensions: { width: 1560, height: 2340 },
		alt: "My Love Story promotional image",
	},
];
