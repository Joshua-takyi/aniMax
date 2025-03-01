"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SearchComponent from "@/components/search";

const navLinks = [
	{ id: 2, path: "/movies", text: "movies" },
	{ id: 3, path: "/series", text: "Tv series" },
	{ id: 4, path: "/top-airing", text: "top airing" },
];

export default function MainNav() {
	const pathName = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const shouldReduceMotion = useReducedMotion();
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	// Close menu on route change
	useEffect(() => {
		setIsOpen(false);
	}, [pathName]);

	// Handle outside clicks and escape key
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isOpen) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen]);

	// Prevent scrolling when menu is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		// Modified cleanup function to properly return void
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

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

	const menuVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5, ease: "easeInOut" },
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.4, ease: "easeInOut" },
		},
	};

	return (
		// Fix: Apply sticky positioning at all screen sizes, not just xl breakpoint
		<header className={cn("w-full sticky top-0 z-50")}>
			<section className="flex justify-between items-center py-2 bg-background/80 backdrop-blur-md px-4 lg:px-10">
				<Link href={"/"}>
					<div className="cursor-pointer">
						<span className="font-bold uppercase text-2xl">AniVerse</span>
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
						<SearchComponent />
					</ul>
				</nav>
				<div className="flex items-center gap-4 md:hidden">
					<ModeToggle />
					<button
						ref={buttonRef}
						onClick={() => setIsOpen(!isOpen)}
						className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md z-50"
						aria-label={isOpen ? "Close menu" : "Open menu"}
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
					>
						<motion.div animate={isOpen ? "open" : "closed"} initial={false}>
							{isOpen ? (
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
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
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
							)}
						</motion.div>
					</button>
				</div>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							ref={menuRef}
							aria-modal="true"
							aria-label="Mobile navigation menu"
							key="mobile-menu"
							variants={menuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="fixed inset-0 w-full bg-background backdrop-blur-md z-40 overflow-auto h-screen"
							// Fix: Remove inline style properties that could interfere with fixed positioning
							style={{
								position: "fixed", // Ensure this is explicitly fixed
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
							}}
						>
							{/* Fix: Adjust padding to ensure content is properly positioned */}
							<div className="flex flex-col justify-start items-center pt-20 pb-8 h-full">
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
													"text-2xl font-medium transition-all duration-150",
													pathName === link.path
														? "text-primary font-bold"
														: "text-muted-foreground hover:text-primary"
												)}
												onClick={() => setIsOpen(false)}
											>
												{link.text}
											</Link>
										</motion.li>
									))}
								</motion.ul>
								{/* Fix: Add more space above search for better positioning */}
								<div className="mt-10 w-[85%] max-w-md">
									<SearchComponent />
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</header>
	);
}
