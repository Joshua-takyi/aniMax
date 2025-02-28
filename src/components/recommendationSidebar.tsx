"use client";
import { useState, useEffect, useRef } from "react";
import { GetAnimeRecommendationsById } from "@/action";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Star, X } from "lucide-react";
import Link from "next/link";

interface RecommendAnimeCardProps {
	image: string;
	title: string;
	type: string;
	numOfRecommendation: number;
	duration?: string;
	id: number;
}

export interface DataProps {
	entry: {
		mal_id: number;
		images: {
			webp: {
				large_image_url: string;
			};
		};
		title: string;
		type: string;
		duration: string;
	};
	votes: number;
}

// Recommendation card component with hover effect
const RecommendAnimeCard = ({
	image,
	title,
	id,
	type,
	numOfRecommendation,
}: RecommendAnimeCardProps) => {
	return (
		<Link href={`/profile/${id}`} className="block">
			<div className="flex gap-3 p-3 hover:bg-primary/50 transition-colors rounded-md">
				<div className="relative flex-shrink-0 w-16 h-24 overflow-hidden rounded shadow">
					<Image
						fill
						sizes="(max-width: 768px) 64px, 64px"
						src={image}
						alt={title}
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col justify-between py-1 flex-1 min-w-0">
					<div>
						<h3 className="font-medium text-sm  line-clamp-2">{title}</h3>
						<div className="flex items-center mt-1">
							<div className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">
								{type}
							</div>
						</div>
					</div>
					<div className="flex items-center text-xs  mt-1">
						<Star size={12} className="text-amber-400 mr-1" />
						<span>{numOfRecommendation} recommendations</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default function AnimeSidebar({
	animeId,
}: Readonly<{ animeId: string }>) {
	// State management for sidebar visibility and screen size
	const [isExpanded, setIsExpanded] = useState(false);
	const [isMobile, setIsMobile] = useState(
		typeof window !== "undefined" ? window.innerWidth < 890 : false
	);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Track whether body scroll should be locked (for mobile)
	const [isBodyLocked, setIsBodyLocked] = useState(false);

	// Fetch recommendation data with react-query
	const { data, isLoading } = useQuery({
		queryKey: ["recommendation", animeId],
		queryFn: async () => {
			const res = await GetAnimeRecommendationsById({
				animeId: animeId,
			});
			return res.data;
		},
		// Add these optimizations:
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 30 * 60 * 1000, // 30 minutes
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	// Handle screen resize and set appropriate sidebar state
	useEffect(() => {
		const handleResize = () => {
			// Define mobile breakpoint at 890px
			const mobile = window.innerWidth < 890;
			setIsMobile(mobile);

			// Auto-expand on desktop, collapse on mobile by default
			if (!mobile) {
				setIsExpanded(true);
			} else {
				setIsExpanded(false);
			}
		};

		// Initialize and set up listener
		handleResize();
		window.addEventListener("resize", handleResize);

		// Clean up resize listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Lock/unlock body scroll when sidebar is expanded/collapsed on mobile
	useEffect(() => {
		// Only apply scroll locking on mobile
		if (isMobile) {
			if (isExpanded) {
				// Lock body scroll when sidebar is expanded on mobile
				document.body.style.overflow = "hidden";
				setIsBodyLocked(true);
			} else if (isBodyLocked) {
				// Restore scroll when sidebar collapses
				document.body.style.overflow = "";
				setIsBodyLocked(false);
			}
		}

		// Clean up on unmount
		return () => {
			document.body.style.overflow = "";
		};
	}, [isExpanded, isMobile, isBodyLocked]);

	// Close sidebar when clicking outside on mobile
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMobile &&
				isExpanded &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest(".sidebar-toggle")
			) {
				setIsExpanded(false);
			}
		};

		// Add click listener
		document.addEventListener("mousedown", handleClickOutside);

		// Clean up listener on unmount
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobile, isExpanded]);

	// Handle escape key to close sidebar
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isExpanded && isMobile) {
				setIsExpanded(false);
			}
		};

		// Add keyboard listener
		document.addEventListener("keydown", handleEscKey);

		// Clean up listener on unmount
		return () => document.removeEventListener("keydown", handleEscKey);
	}, [isExpanded, isMobile]);

	// Don't show anything if loading and on mobile
	if (isLoading) {
		if (isMobile) return null;

		return (
			<div className="w-64 lg:w-72 border-l animate-pulse">
				<div className="h-14 bg-slate-100"></div>
				<div className="p-4 space-y-4">
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="flex gap-3">
							<div className="w-16 h-24 bg-primary/90 rounded"></div>
							<div className="flex-1 space-y-2">
								<div className="h-4 bg-primary/90 rounded w-3/4"></div>
								<div className="h-3 bg-primary/90 rounded w-1/4"></div>
								<div className="h-3 bg-primary/90 rounded w-1/2 mt-6"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (!data || data.length === 0 || (isMobile && !isExpanded)) {
		return isMobile ? <SidebarToggle /> : null;
	}

	// Get only first 8 recommendations
	const limitedData = data.slice(0, 8);

	// Mobile toggle button component that appears on the edge of the screen
	function SidebarToggle() {
		return !isExpanded && isMobile ? (
			<button
				onClick={() => setIsExpanded(true)}
				className="sidebar-toggle fixed top-1/2 transform -translate-y-1/2 z-40 right-0 bg-primary rounded-l-md shadow-lg p-2 transition-all duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
				aria-label="Toggle recommendations sidebar"
			>
				<ChevronLeft size={20} />
			</button>
		) : null;
	}

	// Sidebar content component
	const SidebarContent = () => (
		<div className="space-y-1">
			{limitedData.map((item: DataProps) => (
				<RecommendAnimeCard
					key={item.entry.mal_id}
					id={item.entry.mal_id}
					image={item.entry.images.webp.large_image_url}
					title={item.entry.title}
					type={item.entry.type || "Unknown"}
					duration={item.entry.duration || "N/A"}
					numOfRecommendation={item.votes}
				/>
			))}

			{data.length > 8 && (
				<Link
					href={`/anime/${animeId}/recommendations`}
					className="flex items-center justify-center text-sm text-indigo-600 font-medium p-2 mt-2 hover:bg-indigo-50 rounded-md transition-colors"
				>
					View all recommendations
					<ChevronRight size={16} className="ml-1" />
				</Link>
			)}
		</div>
	);

	// Create overlay for mobile backdrop
	const MobileOverlay = () =>
		isMobile &&
		isExpanded && (
			<div
				className="fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300"
				aria-hidden="true"
			/>
		);

	return (
		<>
			{/* Mobile toggle button */}
			{isMobile && <SidebarToggle />}

			{/* Mobile backdrop overlay */}
			<MobileOverlay />

			{/* Main sidebar component */}
			<div
				ref={sidebarRef}
				className={`
          ${
						isMobile
							? `fixed inset-y-0 right-0 z-50 shadow-xl w-72 bg-background ${
									isExpanded ? "translate-x-0" : "translate-x-full"
							  }`
							: "relative xl:sticky xl:top-17 w-64 lg:w-72"
					}
          transition-transform duration-300 ease-in-out
          
          flex flex-col
          h-full
        `}
				aria-label="Anime recommendations"
				aria-hidden={isMobile && !isExpanded}
				aria-expanded={isExpanded}
			>
				{/* Sidebar header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="font-semibold">Recommendations</h2>
					{isMobile && (
						<button
							onClick={() => setIsExpanded(false)}
							className="text-slate-500 p-1 rounded-full transition-colors"
							aria-label="Close sidebar"
						>
							<X size={18} />
						</button>
					)}
					{!isMobile && (
						<span className="text-sm px-2 py-0.5 rounded-full">
							{data.length}
						</span>
					)}
				</div>

				{/* Scrollable content area */}
				<div className="overflow-y-auto flex-1 overscroll-contain">
					<div className="p-2">
						<SidebarContent />
					</div>
				</div>
			</div>
		</>
	);
}
