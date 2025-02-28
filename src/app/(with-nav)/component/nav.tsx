"use client";
import SearchComponent from "@/components/search";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navLinks = [
	{
		id: 2,
		path: "/movies",
		text: "movies",
	},
	{
		id: 3,
		path: "/series",
		text: "Tv series",
	},
	{
		id: 4,
		path: "/top-airing",
		text: "top airing",
	},
];

export default function MainNav() {
	const pathName = usePathname();
	const isActive = (path: string) => pathName === path;
	const [isOpen, setIsOpen] = useState(false);
	const shouldReduceMotion = useReducedMotion();
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const touchStartY = useRef<number | null>(null);

	// Close mobile menu when route changes
	useEffect(() => {
		setIsOpen(false);
	}, [pathName]);

	// Handle click outside to close menu
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

		// Handle escape key press
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

	// Set up touch handlers for swipe to close
	useEffect(() => {
		if (!menuRef.current || !isOpen) return;

		const handleTouchStart = (e: TouchEvent) => {
			touchStartY.current = e.touches[0].clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (touchStartY.current === null) return;

			const touchY = e.touches[0].clientY;
			const deltaY = touchY - touchStartY.current;

			// If user is swiping up (negative deltaY) and the gesture is significant enough
			if (deltaY < -50) {
				setIsOpen(false);
				touchStartY.current = null;
			}
		};

		const handleTouchEnd = () => {
			touchStartY.current = null;
		};

		const menuElement = menuRef.current;
		menuElement.addEventListener("touchstart", handleTouchStart);
		menuElement.addEventListener("touchmove", handleTouchMove);
		menuElement.addEventListener("touchend", handleTouchEnd);

		return () => {
			menuElement.removeEventListener("touchstart", handleTouchStart);
			menuElement.removeEventListener("touchmove", handleTouchMove);
			menuElement.removeEventListener("touchend", handleTouchEnd);
		};
	}, [isOpen]);

	// Prevent scrolling when mobile menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
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
		hidden: { height: 0, opacity: 0 },
		visible: {
			height: "100vh",
			opacity: 1,
			transition: { duration: 0.5, ease: "easeInOut" },
		},
		exit: {
			height: 0,
			opacity: 0,
			transition: { duration: 0.4, ease: "easeInOut" },
		},
	};

	return (
		<header className={cn("w-full sticky xl:top-0 z-40 ")}>
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
											"p-2 capitalize", // base classes
											{
												"text-primary font-bold ": isActive(nav.path), // applied when active
												"text-muted-foreground hover:text-primary transition-colors":
													!isActive(nav.path), // applied when not active
											}
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
						onClick={() => setIsOpen((prev) => !prev)}
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
							id="mobile-menu"
							variants={menuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="fixed top-0 left-0 w-full h-full bg-background backdrop-blur-md z-40 overflow-hidden"
						>
							<div className="flex flex-col h-full justify-center items-center">
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
													isActive(link.path)
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
								<div className="mt-12">
									<SearchComponent />
								</div>
								<div className="absolute bottom-12 left-0 right-0 flex justify-center">
									<div className="h-1 w-16 bg-muted-foreground/30 rounded-full" />
									<span className="sr-only">Swipe up to close menu</span>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</header>
	);
}
