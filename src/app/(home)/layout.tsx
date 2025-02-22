import Nav from "@/components/nav";
import React from "react";

export default function HomeLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<Nav />
			{children}
		</div>
	);
}
