"use client";
import { GetMovies, MovieProps } from "@/action";
import Loader from "@/app/loading";
import { CardComponent } from "@/components/itemsCard";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "@/components/motion";

export default function Series() {
	const searchParams = useSearchParams();
	const genre = searchParams.get("genre") ?? "";
	const rating = searchParams.get("rating") ?? "";
	const status = searchParams.get("status") ?? "";
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState<MovieProps[]>([]);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(true); // Track initial loading state

	// Enhanced intersection observer with options optimized for mobile
	const { ref, inView } = useInView({
		threshold: 0.1, // Trigger when at least 10% of the element is visible
		triggerOnce: false, // Continue to trigger as user scrolls
		rootMargin: "200px", // Start loading earlier (200px before element comes into view)
		delay: 100, // Small delay to avoid excessive calls
	});

	const fetchMovies = useCallback(
		async (page: number) => {
			const res = await GetMovies({
				type: "tv",
				genre,
				rating,
				status,
				page,
			});
			return res.data;
		},
		[genre, rating, status]
	);

	// Initial data fetch
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const initialMovies = await fetchMovies(1);
				setData(initialMovies);
				setHasMore(initialMovies.length > 0);
			} catch (error) {
				console.error("Error fetching initial movies:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [genre, rating, status, fetchMovies]); // Add fetchMovies to dependencies

	// Infinite scroll logic with improved mobile handling
	useEffect(() => {
		const fetchData = async () => {
			if (inView && hasMore && !isLoadingMore) {
				setIsLoadingMore(true);
				try {
					const newMovies = await fetchMovies(currentPage + 1);
					if (newMovies.length === 0) {
						setHasMore(false);
					} else {
						setData((prevData) => [...prevData, ...newMovies]);
						setCurrentPage((prevPage) => prevPage + 1);
					}
				} catch (error) {
					console.error("Error fetching movies:", error);
				} finally {
					setIsLoadingMore(false);
				}
			}
		};

		// Add a small timeout for better mobile handling
		const timeoutId = setTimeout(() => {
			if (inView) {
				fetchData();
			}
		}, 100);

		return () => clearTimeout(timeoutId);
	}, [inView, currentPage, isLoadingMore, hasMore, fetchMovies]);

	// Function to manually load more results
	const handleManualLoadMore = async () => {
		if (!hasMore || isLoadingMore) return;

		setIsLoadingMore(true);
		try {
			const newMovies = await fetchMovies(currentPage + 1);
			if (newMovies.length === 0) {
				setHasMore(false);
			} else {
				setData((prevData) => [...prevData, ...newMovies]);
				setCurrentPage((prevPage) => prevPage + 1);
			}
		} catch (error) {
			console.error("Error fetching more series:", error);
		} finally {
			setIsLoadingMore(false);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	if (!data || data.length === 0) {
		return <div>No data found</div>;
	}

	return (
		<main>
			<AnimatePresence>
				<MotionDiv
					className="grid  grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{data.map((item: MovieProps, index) => (
						<CardComponent
							key={`${item.mal_id}-${index}`}
							title={item.title}
							rating={item.rating}
							imageUrl={item.images.webp.large_image_url}
							id={item.mal_id}
						/>
					))}
				</MotionDiv>
			</AnimatePresence>

			{/* This invisible element is used for intersection detection */}
			<div ref={ref} className="h-10 w-full opacity-0" aria-hidden="true" />

			{/* Manual load more button for fallback on mobile */}
			<div className="flex justify-center my-6">
				{isLoadingMore ? (
					<Loader />
				) : hasMore ? (
					<button
						onClick={handleManualLoadMore}
						className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full 
                     hover:bg-secondary/90 shadow-sm active:scale-95 transition-all
                     flex items-center gap-2 touch-manipulation min-h-[48px]"
						disabled={isLoadingMore}
					>
						Load More
					</button>
				) : (
					<p className="text-muted-foreground text-sm">
						No more series to load
					</p>
				)}
			</div>
		</main>
	);
}
