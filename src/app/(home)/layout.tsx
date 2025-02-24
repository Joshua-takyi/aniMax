import Nav from "@/components/nav";
import React from "react";
import HeroSection from "./hero";

export default function HomeLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<Nav />
			<HeroSection />
			{children}
		</div>
	);
}
