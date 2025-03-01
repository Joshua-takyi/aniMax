import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/providers/provider";
import RenderMounted from "@/components/renderMounted";
import Script from "next/script";
import type { Metadata } from "next";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "700"],
});

// ! IMPORTANT: Metadata configuration for SEO optimization
export const metadata: Metadata = {
	title: "AnimeVerse | Your Ultimate Anime Discovery Platform",
	description:
		"Discover your next favorite anime with personalized recommendations on Anivese",
	keywords: "anime, recommendations, otaku, anime series, anime movies, manga",

	// * Favicon configuration for various devices and browsers
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},

	// ? Social media and Open Graph integration for better sharing
	openGraph: {
		title: "Anivese - Find Your Perfect Anime Match",
		description: "AI-powered anime recommendations tailored to your taste",
		url: "https://ani-max-seven.vercel.app/",
		siteName: "Anivese",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
			},
		],
		type: "website",
	},

	// TODO: Add additional platform-specific metadata as needed
	twitter: {
		card: "summary_large_image",
		title: "Anivese - Anime Recommendations",
		description: "Join our community of anime enthusiasts",
	},

	// Telegram channel reference
	alternates: {
		canonical: "https://ani-max-seven.vercel.app/",
		types: {
			"application/rss+xml": "https://ani-max-seven.vercel.app/rss.xml",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{/* Google Custom Search Integration */}
				<Script
					async
					src="https://cse.google.com/cse.js?cx=YOUR_GOOGLE_CSE_ID"
					strategy="afterInteractive"
				/>
				<div className="gcse-search"></div>

				{/* RenderMounted ensures components only mount client-side */}
				<RenderMounted>
					{/* Theme configuration for dark/light mode */}
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{/* React Query setup with providers */}
						<QueryProvider>{children}</QueryProvider>
					</ThemeProvider>
				</RenderMounted>
			</body>
		</html>
	);
}
