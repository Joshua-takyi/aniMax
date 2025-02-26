import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local"; // Correct import
import QueryProvider from "@/providers/provider";
import RenderMounted from "@/components/renderMounted";
import MainNav from "./(with-nav)/component/nav";
import Wrapper from "@/components/wrapper";

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
			<body className={`${campton.className}  antialiased`}>
				<RenderMounted>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<QueryProvider>
							<Wrapper>
								<MainNav />
								{children}
							</Wrapper>
						</QueryProvider>
					</ThemeProvider>
				</RenderMounted>
			</body>
		</html>
	);
}
