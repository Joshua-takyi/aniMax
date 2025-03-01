"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SearchComponent from "@/components/search";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
	{ id: 2, path: "/movies", text: "movies" },
	{ id: 3, path: "/series", text: "Tv series" },
	{ id: 4, path: "/top-airing", text: "top airing" },
];

export default function MainNav() {
	const pathName = usePathname();
	const [open, setOpen] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	// Close sheet on route change
	useEffect(() => {
		setOpen(false);
	}, [pathName]);

	const navVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (index: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: shouldReduceMotion ? 0 : index * 0.1,
				duration: 0.4,
				ease: "easeInOut",
			},
		}),
		exit: { opacity: 0, y: 20 },
	};

	// Handler to close the sheet
	const closeSheet = () => setOpen(false);

	return (
		<header className={cn("w-full sticky top-0 z-50")}>
			<section className="flex justify-between items-center py-2 bg-background/80 backdrop-blur-md px-4 lg:px-10">
				<Link href={"/"}>
					<div className="cursor-pointer">
						<span className="font-bold uppercase text-2xl">animax</span>
					</div>
				</Link>
				<nav className="hidden md:block w-full">
					<ul className="flex items-center justify-between gap-10">
						<div className="flex items-center gap-10">
							<AnimatePresence>
								{navLinks.map((nav, index) => (
									<motion.li
										key={nav.id}
										variants={navVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										custom={index}
										className={cn(
											"p-2 capitalize",
											pathName === nav.path
												? "text-primary font-bold"
												: "text-muted-foreground hover:text-primary transition-colors"
										)}
									>
										<Link href={nav.path} className="p-2 cursor-pointer">
											{nav.text}
										</Link>
									</motion.li>
								))}
							</AnimatePresence>
							<ModeToggle />
						</div>
						<SearchComponent onSubmit={closeSheet} />
					</ul>
				</nav>
				<div className="flex items-center gap-4 md:hidden">
					<ModeToggle />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<button
								className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
								aria-label="Open navigation menu"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</button>
						</SheetTrigger>
						<SheetContent
							side="top"
							className="h-dvh bg-background rounded-t-xl px-0"
						>
							<SheetHeader className="px-4">
								<SheetTitle className="text-center font-bold text-xl uppercase">
									animax
								</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col justify-start items-center pt-8 pb-8 h-full">
								<motion.ul
									className="flex flex-col gap-8 items-center"
									initial="hidden"
									animate="visible"
									exit="hidden"
								>
									{navLinks.map((link, index) => (
										<motion.li
											key={link.id}
											variants={navVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
											custom={index}
											className="capitalize"
										>
											<Link
												href={link.path}
												className={cn(
													"text-xl font-medium transition-all duration-150",
													pathName === link.path
														? "text-primary font-bold"
														: "text-muted-foreground hover:text-primary"
												)}
												onClick={() => setOpen(false)}
											>
												{link.text}
											</Link>
										</motion.li>
									))}
								</motion.ul>
								<div className="mt-10 w-[85%] max-w-md">
									<SearchComponent onSubmit={closeSheet} />
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</section>
		</header>
	);
}
