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
	const { ref, inView } = useInView();

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

	// Infinite scroll
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

		if (inView) {
			fetchData();
		}
	}, [
		inView,
		currentPage,
		isLoadingMore,
		hasMore,
		genre,
		rating,
		status,
		fetchMovies,
	]); // Add fetchMovies to dependencies

	if (isLoading) {
		return <Loader />;
	}

	if (!data || data.length === 0) {
		return <div>No data found</div>;
	}

	return (
		<main>
			{/* <h1 className="lg:text-4xl text-2xl font-semibold md:mb-10">Tv Series</h1> */}
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
			<div ref={ref} className="lg:pt-4">
				{isLoadingMore && <Loader />}
			</div>
		</main>
	);
}
