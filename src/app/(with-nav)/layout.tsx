"use client";

import { useEffect, useState } from "react";
import { SideBar } from "@/components/select";
import { animeGenres } from "@/dataset/db";
import { usePathname } from "next/navigation";
import Wrapper from "@/components/wrapper";
import MainNav from "./component/nav";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [isHidden, setIsHidden] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.includes("/profile")) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}
	}, [pathname]);

	return (
		<div className="min-h-screen">
			<div className="flex relative">
				<main className="md:p-6 flex-1">
					<MainNav />
					<Wrapper>
						<div className="flex gap-4">
							<div className="flex-1">{children}</div>
							{!isHidden && <SideBar data={animeGenres} />}
						</div>
					</Wrapper>
				</main>
			</div>
		</div>
	);
}
