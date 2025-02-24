"use client";
import Image from "next/image";
import logo from "@/../public/images/logo.svg";
import Wrapper from "@/components/wrapper";
import SearchComponent from "@/components/search";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { navLinks } from "@/components/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { useEffect } from "react";
export default function MainNav() {
	const pathName = usePathname();
	const isActive = (path: string) => pathName === path;
	// useEffect(() => {
	// 	const HideNavOnScrollDown = () => {
	// 		const nav = document.querySelector("header");
	// 		if (nav) {
	// 			let prevScrollPos = window.scrollY;
	// 			window.addEventListener("scroll", () => {
	// 				const currentScrollPos = window.scrollY;
	// 				if (prevScrollPos > currentScrollPos) {
	// 					nav.style.top = "0";
	// 					nav.style.transition = "top 0.5s ease-in-out";
	// 				} else {
	// 					nav.style.top = "-100px";
	// 				}
	// 				prevScrollPos = currentScrollPos;
	// 			});
	// 		}
	// 	};
	// 	HideNavOnScrollDown();
	// });
	return (
		<header className="w-full sticky top-0 z-50 ">
			<Wrapper className="flex justify-between items-center py-4 rounded-full bg-background/80 backdrop-blur-md border-[0.9px] border-border/40">
				<Link href={"/"}>
					{/* logo */}
					<Image src={logo} alt="my logo" />
				</Link>
				<nav className="w-full">
					<ul className="flex items-center justify-between gap-10">
						<div className="flex items-center gap-10">
							{navLinks.map((nav) => (
								<Link
									href={nav.path}
									key={nav.id}
									className={cn(
										"p-2 capitalize", // base classes
										{
											"text-primary font-bold": isActive(nav.path), // applied when active
											"text-muted-foreground hover:text-primary transition-colors":
												!isActive(nav.path), // applied when not active
										}
									)}
								>
									{nav.text}
								</Link>
							))}
							<ModeToggle />
						</div>
						<SearchComponent />
					</ul>
				</nav>
			</Wrapper>
		</header>
	);
}
