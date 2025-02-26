"use client";
import { useCallback, useState, useEffect } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

// --- Genre Filter ---
interface SelectProps {
	id: number;
	name: string;
}

interface GenreFilterProps {
	data: SelectProps[];
	selectedGenreIds: number[];
	onGenreChange: (genreIds: number[]) => void;
}

function GenreFilter({
	data,
	selectedGenreIds,
	onGenreChange,
}: GenreFilterProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleGenreChange = (genreId: number) => {
		onGenreChange([genreId]);
	};

	return (
		<div className="border-b border-gray-200 pb-4">
			<button
				aria-expanded={isOpen}
				className="flex w-full items-center justify-between py-2 text-sm font-medium"
				onClick={() => setIsOpen(!isOpen)}
			>
				Genres
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="mt-2 space-y-1">
							{data.map((genre) => (
								<label
									key={genre.id}
									className="flex items-center space-x-2 cursor-pointer hover:bg-primary/90 p-1 rounded"
								>
									<input
										type="radio"
										name="genre"
										checked={selectedGenreIds.includes(genre.id)}
										onChange={() => handleGenreChange(genre.id)}
										className="border-gray-300"
									/>
									<span className="text-sm">{genre.name}</span>
								</label>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// --- Type Filter ---
interface TypeFilterProps {
	selectedType: string;
	onTypeChange: (type: string) => void;
}

const typeOptions = [
	{
		value: "anime",
		label: "Anime",
		hasChildren: true,
		children: [
			{ value: "series", label: "TV" },
			{ value: "movies", label: "Movie" },
		],
	},
	{ value: "manga", label: "Manga", hasChildren: false },
];

function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [expandedParent, setExpandedParent] = useState<string | null>("anime"); // Default expanded

	const handleTypeChange = (type: string) => {
		onTypeChange(type);
	};

	const toggleParentExpand = (value: string) => {
		setExpandedParent(expandedParent === value ? null : value);
	};

	return (
		<div className="border-b border-gray-200 pb-4">
			<button
				aria-expanded={isOpen}
				className="flex w-full items-center justify-between py-2 text-sm font-medium"
				onClick={() => setIsOpen(!isOpen)}
			>
				Type
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="mt-2 space-y-1">
							{typeOptions.map((option) => (
								<div key={option.value} className="mb-1">
									{option.hasChildren ? (
										<div>
											<button
												className="w-full flex items-center justify-between cursor-pointer hover:bg-primary/10 p-1 rounded"
												onClick={() => toggleParentExpand(option.value)}
											>
												<span className="text-sm font-medium">
													{option.label}
												</span>
												<ChevronDown
													className={`h-4 w-4 transition-transform ${
														expandedParent === option.value ? "rotate-180" : ""
													}`}
												/>
											</button>

											<AnimatePresence>
												{expandedParent === option.value && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.15 }}
														className="overflow-hidden ml-4"
													>
														{option.children?.map((child) => (
															<label
																key={child.value}
																className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-1 rounded"
															>
																<input
																	type="radio"
																	name="type"
																	checked={selectedType === child.value}
																	onChange={() => handleTypeChange(child.value)}
																	className="border-gray-300"
																/>
																<span className="text-sm">{child.label}</span>
															</label>
														))}
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									) : (
										<label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-1 rounded">
											<input
												type="radio"
												name="type"
												checked={selectedType === option.value}
												onChange={() => handleTypeChange(option.value)}
												className="border-gray-300"
											/>
											<span className="text-sm">{option.label}</span>
										</label>
									)}
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
// --- Rating Filter ---
interface RatingFilterProps {
	selectedRating: string;
	onRatingChange: (rating: string) => void;
}

function RatingFilter({ selectedRating, onRatingChange }: RatingFilterProps) {
	const [isOpen, setIsOpen] = useState(false);
	const ratings = ["g", "pg", "pg13", "r17", "r", "rx"];

	return (
		<div className="border-b border-gray-200 pb-4">
			<button
				aria-expanded={isOpen}
				className="flex w-full items-center justify-between py-2 text-sm font-medium"
				onClick={() => setIsOpen(!isOpen)}
			>
				Rating
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="mt-2 space-y-1">
							{ratings.map((rating) => (
								<label
									key={rating}
									className="uppercase flex items-center space-x-2 cursor-pointer hover:bg-primary/90 p-1 rounded"
								>
									<input
										type="radio"
										name="rating"
										checked={selectedRating === rating}
										onChange={() => onRatingChange(rating)}
										className="border-gray-300"
									/>
									<span className="text-sm">{rating}</span>
								</label>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// --- Status Filter ---
interface StatusFilterProps {
	selectedStatuses: string[];
	onStatusChange: (statuses: string[]) => void;
}

const statusOptions = [
	{ value: "airing", label: "Airing" },
	{ value: "finished", label: "Finished" },
	{ value: "upcoming", label: "Upcoming" },
];

function StatusFilter({ selectedStatuses, onStatusChange }: StatusFilterProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleStatusChange = (statusValue: string) => {
		onStatusChange(
			selectedStatuses.includes(statusValue)
				? selectedStatuses.filter((s) => s !== statusValue)
				: [...selectedStatuses, statusValue]
		);
	};

	return (
		<div className="border-b border-gray-200 pb-4">
			<button
				aria-expanded={isOpen}
				className="flex w-full items-center justify-between py-2 text-sm font-medium"
				onClick={() => setIsOpen(!isOpen)}
			>
				Status
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="mt-2 space-y-1">
							{statusOptions.map((option) => (
								<label
									key={option.value}
									className="flex items-center space-x-2 cursor-pointer hover:bg-primary/90 p-1 rounded"
								>
									<input
										type="checkbox"
										checked={selectedStatuses.includes(option.value)}
										onChange={() => handleStatusChange(option.value)}
										className="rounded border-gray-300"
									/>
									<span className="text-sm">{option.label}</span>
								</label>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// --- Main Sidebar Component ---
interface SidebarProps {
	data: SelectProps[];
}

export function SideBar({ data }: SidebarProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
	const [selectedRating, setSelectedRating] = useState<string>("");
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
	const [selectedType, setSelectedType] = useState<string>("anime"); // Default to anime

	// Check if the screen is mobile on mount and on window resize
	useEffect(() => {
		const checkIfMobile = () => {
			const isMobileView = window.innerWidth < 890;
			setIsMobile(isMobileView);

			// Show sidebar by default only on desktop
			if (!isMobileView) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		// Set initial value
		checkIfMobile();

		// Add resize listener
		window.addEventListener("resize", checkIfMobile);

		// Clean up
		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	// Initialize filters from URL params on component mount
	useEffect(() => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		// Get genres from URL
		const genreParam = params.get("genre");
		if (genreParam) {
			const genreIds = genreParam.split(",").map(Number);
			setSelectedGenreIds(genreIds);
		}

		// Get rating from URL
		const ratingParam = params.get("rating");
		if (ratingParam) {
			setSelectedRating(ratingParam);
		}

		// Get status from URL
		const statusParam = params.get("status");
		if (statusParam) {
			const statuses = statusParam.split(",");
			setSelectedStatuses(statuses);
		}

		// Get type from URL
		const typeParam = params.get("type");
		if (typeParam) {
			setSelectedType(typeParam);
		}
	}, []);

	const handleApplyFilters = useCallback(() => {
		const params = new URLSearchParams();

		// Update genres (as comma-separated list of IDs)
		if (selectedGenreIds.length > 0) {
			params.set("genre", selectedGenreIds.join(","));
		}

		// Update rating
		if (selectedRating) {
			params.set("rating", selectedRating);
		}

		// Update status
		if (selectedStatuses.length > 0) {
			params.set("status", selectedStatuses.join(","));
		}

		// Get the current path from window.location.pathname
		const currentPath = window.location.pathname;

		// Only change the path if type is explicitly selected
		let path = currentPath;
		if (selectedType !== "anime") {
			path = `/${selectedType}`;
		}

		const newUrl = `${path}?${params.toString()}`;
		window.location.href = newUrl;

		// Close sidebar on mobile after applying filters
		if (isMobile) {
			setIsVisible(false);
		}
	}, [
		selectedGenreIds,
		selectedRating,
		selectedStatuses,
		selectedType,
		isMobile,
	]);

	const handleClearAll = useCallback(() => {
		setSelectedGenreIds([]);
		setSelectedRating("");
		setSelectedStatuses([]);
		setSelectedType("anime"); // Reset to default type
		window.history.pushState({}, "", window.location.pathname);
		window.location.reload(); // Refresh the page
	}, []);

	// Get total number of active filters for indicator
	const totalActiveFilters =
		selectedGenreIds.length +
		(selectedRating ? 1 : 0) +
		selectedStatuses.length +
		(selectedType !== "anime" ? 1 : 0);

	// Sidebar position and styling based on mobile/desktop
	const sidebarClasses = isMobile
		? "fixed top-0 right-0 h-screen max-h-screen w-64 border-l px-4 overflow-y-auto z-50 bg-background shadow-lg"
		: "sticky top-17 w-72 h-fit max-h-screen px-4 overflow-y-auto";

	return (
		<>
			{/* Mobile toggle button (fade in/out, no slide) */}
			<AnimatePresence>
				{isMobile && !isVisible && (
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed top-1/2 right-0 -translate-y-1/2 z-50 bg-primary text-white dark:bg-black p-2 rounded-l-md shadow-lg"
						onClick={() => setIsVisible(true)}
					>
						<ChevronLeft className="h-6 w-6" />
						{totalActiveFilters > 0 && (
							<div className="absolute -top-2 -left-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
								{totalActiveFilters}
							</div>
						)}
					</motion.button>
				)}
			</AnimatePresence>

			{/* Sidebar with different animations for mobile/desktop */}
			<AnimatePresence>
				{isVisible && (
					<motion.aside
						initial={isMobile ? { x: "100%" } : { opacity: 0 }}
						animate={isMobile ? { x: 0 } : { opacity: 1 }}
						exit={isMobile ? { x: "100%" } : { opacity: 0 }}
						transition={{ duration: 0.3 }}
						className={`${sidebarClasses} ${isMobile ? "" : "md:block"}`}
					>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-lg font-semibold">Filters</h2>
							{isMobile && (
								<button
									className="rounded-full p-1 hover:bg-muted"
									onClick={() => setIsVisible(false)}
									aria-label="Close sidebar"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							)}
						</div>

						<div className="flex items-center justify-between mb-6">
							<button
								className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
								onClick={handleClearAll}
							>
								Clear all
							</button>
							{isMobile && (
								<div className="text-sm">
									{totalActiveFilters > 0 ? (
										<span>{totalActiveFilters} active filters</span>
									) : (
										<span>No active filters</span>
									)}
								</div>
							)}
						</div>

						<div className="space-y-4">
							<TypeFilter
								selectedType={selectedType}
								onTypeChange={setSelectedType}
							/>
							<GenreFilter
								data={data}
								selectedGenreIds={selectedGenreIds}
								onGenreChange={setSelectedGenreIds}
							/>
							<StatusFilter
								selectedStatuses={selectedStatuses}
								onStatusChange={setSelectedStatuses}
							/>
							<RatingFilter
								selectedRating={selectedRating}
								onRatingChange={setSelectedRating}
							/>
						</div>

						<Button
							className="w-full mt-6 py-2 rounded-md transition-colors cursor-pointer hover:bg-primary/90"
							onClick={handleApplyFilters}
						>
							Apply Filters
						</Button>

						{/* Add swipe indicator for mobile */}
						{isMobile && (
							<div className="absolute bottom-8 left-0 right-0 flex justify-center">
								<div className="h-1 w-16 bg-muted-foreground/30 rounded-full" />
								<span className="sr-only">Swipe right to close</span>
							</div>
						)}
					</motion.aside>
				)}
			</AnimatePresence>

			{/* Overlay for mobile sidebar */}
			<AnimatePresence>
				{isMobile && isVisible && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black z-40"
						onClick={() => setIsVisible(false)}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
