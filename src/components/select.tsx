"use client";
import { useCallback, useState, useEffect } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

// --- Genre Filter ---
interface SelectProps {
	id: number;
	name: string;
	isMulti?: boolean;
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
		onGenreChange(
			selectedGenreIds.includes(genreId)
				? selectedGenreIds.filter((id) => id !== genreId)
				: [...selectedGenreIds, genreId]
		);
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
										type="checkbox"
										checked={selectedGenreIds.includes(genre.id)}
										onChange={() => handleGenreChange(genre.id)}
										className="rounded border-gray-300"
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

	// Check if the screen is mobile on mount and when window resizes
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Set initial value
		checkIfMobile();

		// Add resize listener
		window.addEventListener("resize", checkIfMobile);

		// Show sidebar by default on desktop
		if (!isMobile) setIsVisible(true);

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
	}, []);

	const handleApplyFilters = useCallback(() => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		// Update genres (as comma-separated list of IDs)
		if (selectedGenreIds.length > 0) {
			params.set("genre", selectedGenreIds.join(","));
		} else {
			params.delete("genre");
		}

		// Update rating
		if (selectedRating) {
			params.set("rating", selectedRating);
		} else {
			params.delete("rating");
		}

		// Update status
		if (selectedStatuses.length > 0) {
			params.set("status", selectedStatuses.join(","));
		} else {
			params.delete("status");
		}

		// Update URL without page refresh
		const newUrl = `${window.location.pathname}?${params.toString()}`;
		window.history.pushState({}, "", newUrl);

		// Close sidebar on mobile after applying filters
		if (isMobile) {
			setIsVisible(false);
		}
	}, [selectedGenreIds, selectedRating, selectedStatuses, isMobile]);

	const handleClearAll = useCallback(() => {
		setSelectedGenreIds([]);
		setSelectedRating("");
		setSelectedStatuses([]);
		window.history.pushState({}, "", window.location.pathname);
	}, []);

	// Get total number of active filters for indicator
	const totalActiveFilters =
		selectedGenreIds.length +
		(selectedRating ? 1 : 0) +
		selectedStatuses.length;

	return (
		<>
			{/* Chevron toggle button for mobile */}
			<AnimatePresence>
				{isMobile && !isVisible && (
					<motion.button
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 10 }}
						className="fixed top-1/2 right-0 -translate-y-1/2 z-50 bg-primary text-white p-2 rounded-l-md shadow-lg"
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

			{/* Sidebar */}
			<AnimatePresence>
				{isVisible && (
					<motion.aside
						initial={isMobile ? { x: "100%" } : { x: -300 }}
						animate={{ x: 0 }}
						exit={isMobile ? { x: "100%" } : { x: -300 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className={`fixed md:sticky top-0 right-0 md:right-auto h-screen md:h-fit max-h-screen w-64 md:w-72 
        md:bg-transparent border-l md:border-l-0 md:border-r  bg-background
        p-6 overflow-y-auto z-40 z-50`}
					>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-lg font-semibold">Filters</h2>
							<button
								className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
								onClick={handleClearAll}
							>
								Clear all
							</button>
						</div>

						<div className="space-y-4">
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
					</motion.aside>
				)}
			</AnimatePresence>

			{/* Overlay for mobile sidebar */}
			{isMobile && isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black z-30"
					onClick={() => setIsVisible(false)}
				/>
			)}
		</>
	);
}
