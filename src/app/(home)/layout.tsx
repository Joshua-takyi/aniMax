import React from "react";
import HeroSection from "./hero";

export default function HomeLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<HeroSection />
			{children}
		</div>
	);
}
