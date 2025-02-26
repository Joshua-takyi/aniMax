"use client";
import { GetMovies, MovieProps } from "@/action";
import Loader from "@/app/loading";
import { CardComponent } from "@/components/itemsCard";
import { MotionDiv } from "@/components/motion";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Series() {
	const searchParams = useSearchParams();
	const genre = searchParams.get("genre") ?? "";
	const rating = searchParams.get("rating") ?? "";
	const status = searchParams.get("status") ?? "";
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState<MovieProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();

	const fetchMovies = async (page: number) => {
		const res = await GetMovies({
			type: "tv",
			genre,
			rating,
			status,
			page,
		});
		return res.data;
	};

	// Initial data load - resets when filters change
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setCurrentPage(1); // Reset page when filters change
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
	}, [genre, rating, status]);

	// Load more data when scrolling
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
	}, [inView, currentPage, isLoadingMore, hasMore, genre, rating, status]);

	if (isLoading) {
		return <Loader />;
	}
	if (!data || data.length === 0) {
		return <div>No data found</div>;
	}

	return (
		<main>
			<h1 className="text-4xl font-bold mb-10">TV Series</h1>
			<AnimatePresence>
				<MotionDiv
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{data.map((item: MovieProps) => (
						<CardComponent
							key={item.mal_id}
							title={item.title}
							rating={item.rating}
							imageUrl={item.images.webp.large_image_url}
							id={item.mal_id}
						/>
					))}
					<div ref={ref}>{isLoadingMore && <Loader />}</div>
				</MotionDiv>
			</AnimatePresence>
		</main>
	);
}
