import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import localFont from "next/font/local";
import QueryProvider from "@/providers/provider";
import RenderMounted from "@/components/renderMounted";
import Script from "next/script";
import SmoothScroll from "@/components/lenis";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "700"],
});

// const campton = localFont({
// 	src: "../fonts/CamptonBook.otf",
// 	variable: "--font-campton",
// });

export const metadata: Metadata = {
	title: "AnimeVerse | Your Ultimate Anime Discovery Platform",
	description:
		"Explore the latest anime series, read reviews, track your watchlist, and connect with fellow anime enthusiasts. Discover new shows, classic favorites, and upcoming releases all in one place.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}  antialiased `}>
				<Script
					async
					src="https://cse.google.com/cse.js?cx=012345678901234567890:abcdefg"
					strategy="afterInteractive"
				/>
				<div className="gcse-search"></div>
				<RenderMounted>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<QueryProvider>
							<SmoothScroll>{children}</SmoothScroll>
						</QueryProvider>
					</ThemeProvider>
				</RenderMounted>
			</body>
		</html>
	);
}
