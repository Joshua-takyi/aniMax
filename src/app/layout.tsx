import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/nav";
import localFont from "next/font/local"; // Correct import

const campton = localFont({
	src: "../fonts/CamptonBook.otf",
	variable: "--font-campton",
});

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
			<body
				className={`${campton.className}  antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Nav />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
