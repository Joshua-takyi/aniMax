"use client";
import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { Button } from "./ui/button";

// --- Genre Filter ---
interface SelectProps {
	id: number;
	name: string;
	isMulti?: boolean;
}

interface GenreFilterProps {
	data: SelectProps[];
	selectedGenres: string[];
	onGenreChange: (genres: string[]) => void;
}

function GenreFilter({
	data,
	selectedGenres,
	onGenreChange,
}: GenreFilterProps) {
	const [isOpen, setIsOpen] = useState(true);

	const handleGenreChange = (genreName: string) => {
		onGenreChange(
			selectedGenres.includes(genreName)
				? selectedGenres.filter((g) => g !== genreName)
				: [...selectedGenres, genreName]
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

			{isOpen && (
				<div className="mt-2 space-y-1">
					{data.map((genre) => (
						<label
							key={genre.id}
							className="flex items-center space-x-2 cursor-pointer hover:bg-primary/90 p-1 rounded"
						>
							<input
								type="checkbox"
								checked={selectedGenres.includes(genre.name)}
								onChange={() => handleGenreChange(genre.name)}
								className="rounded border-gray-300"
							/>
							<span className="text-sm">{genre.name}</span>
						</label>
					))}
				</div>
			)}
		</div>
	);
}

// --- Rating Filter ---
interface RatingFilterProps {
	selectedRating: string;
	onRatingChange: (rating: string) => void;
}

function RatingFilter({ selectedRating, onRatingChange }: RatingFilterProps) {
	const [isOpen, setIsOpen] = useState(true);
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

			{isOpen && (
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
			)}
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
	const [isOpen, setIsOpen] = useState(true);

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

			{isOpen && (
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
			)}
		</div>
	);
}

// --- Main Sidebar Component ---
interface SidebarProps {
	data: SelectProps[];
}

export function SideBar({ data }: SidebarProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [selectedRating, setSelectedRating] = useState<string>("");
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

	const handleApplyFilters = () => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		// Update genres (as comma-separated list)
		if (selectedGenres.length > 0) {
			params.set("genre", selectedGenres.join(","));
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
	};

	const handleClearAll = () => {
		setSelectedGenres([]);
		setSelectedRating("");
		setSelectedStatuses([]);
		window.history.pushState({}, "", window.location.pathname);
	};

	return (
		<>
			<button
				className="fixed bottom-4 right-4 md:hidden z-50 bg-black text-white p-3 rounded-full shadow-lg"
				onClick={() => setIsVisible(true)}
			>
				<Filter className="h-6 w-6" />
			</button>

			<aside
				className={`
          sticky top-0 h-fit max-h-screen w-64 md:w-72 transform transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          border-l md:border-l-0 md:border-r border-gray-200 p-6 overflow-y-auto z-40
        `}
			>
				<button
					className="md:hidden absolute top-4 right-4 text-gray-500"
					onClick={() => setIsVisible(false)}
				>
					<X className="h-6 w-6" />
				</button>

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
						selectedGenres={selectedGenres}
						onGenreChange={setSelectedGenres}
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
			</aside>
		</>
	);
}
