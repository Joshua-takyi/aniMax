"use client";
import AnimeSidebar from "@/components/recommendationSidebar";
import { useParams } from "next/navigation";
import React from "react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const params = useParams();
	const id = params.id as string;
	return (
		<main className=" md:px-6 flex flex-col md:flex-row ">
			<div className="flex-1 min-w-0">
				<div className="prose max-w-none">{children}</div>
			</div>
			<AnimeSidebar animeId={id} />
		</main>
	);
}
