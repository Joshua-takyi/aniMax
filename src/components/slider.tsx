"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState, useCallback, memo } from "react";
import Slider from "react-slick";
import Image from "next/image";
import right from "../../public/images/arrow-right.original.png";
import left from "../../public/images/arrow-left.original.png";

// Custom arrow components - memoized to prevent unnecessary re-renders
const NextArrow = memo(({ onClick, isDisabled }: ArrowProps) => {
	return (
		<div
			className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-black bg-opacity-50 rounded-l-md hover:bg-opacity-70 transition-all duration-300 ${
				isDisabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
			onClick={onClick}
		>
			<Image
				src={right}
				alt="Next"
				width={30}
				height={30}
				className="w-6 h-6 md:w-8 md:h-8"
			/>
		</div>
	);
});
NextArrow.displayName = "NextArrow";

const PrevArrow = memo(({ onClick, isDisabled }: ArrowProps) => {
	return (
		<div
			className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-black bg-opacity-50 rounded-r-md hover:bg-opacity-70 transition-all duration-300 ${
				isDisabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
			onClick={onClick}
		>
			<Image
				src={left}
				alt="Previous"
				width={30}
				height={30}
				className="w-6 h-6 md:w-8 md:h-8"
			/>
		</div>
	);
});
PrevArrow.displayName = "PrevArrow";

interface ArrowProps {
	onClick?: () => void;
	isDisabled?: boolean;
}

interface ImageItem {
	id: number;
	image: string;
	name?: string;
	alt?: string;
	title?: string;
}

interface SliderProps {
	data: ImageItem[];
}

// Memoized slide component to prevent re-renders of all slides
const SlideItem = memo(({ item }: { item: ImageItem }) => (
	<div className="relative px-1">
		<div className="overflow-hidden">
			<Image
				alt={` ${item.title}`}
				src={item.image}
				width={200}
				height={250}
				className="object-cover w-full transform transition-transform hover:scale-105 will-change-transform"
				priority={item.id <= 4}
				loading={item.id <= 4 ? "eager" : "lazy"}
			/>
		</div>
	</div>
));
SlideItem.displayName = "SlideItem";

const SliderComponent: React.FC<SliderProps> = ({ data }) => {
	const sliderRef = useRef<Slider>(null);
	const [isDragging, setIsDragging] = useState(false);

	// Use callbacks to prevent recreation of handler functions
	const handleBeforeChange = useCallback(() => setIsDragging(true), []);
	const handleAfterChange = useCallback(() => setIsDragging(false), []);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		autoplay: false,
		slidesToScroll: 1,
		initialSlide: 0,
		nextArrow: <NextArrow isDisabled={isDragging} />,
		prevArrow: <PrevArrow isDisabled={isDragging} />,
		pauseOnHover: true,
		swipe: true,
		swipeToSlide: true,
		draggable: true,
		cssEase: "cubic-bezier(0.23, 1, 0.32, 1)", // Use better easing function
		useCSS: true,
		useTransform: true, // Use CSS3 transforms for better performance
		beforeChange: handleBeforeChange,
		afterChange: handleAfterChange,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="relative">
			<style jsx global>{`
				.slick-track {
					will-change: transform; /* Hint to browser for hardware acceleration */
					margin-left: auto;
					margin-right: auto;
				}
				.slick-slide {
					will-change: opacity;
					-webkit-backface-visibility: hidden;
					-moz-backface-visibility: hidden;
					backface-visibility: hidden;
					-webkit-perspective: 1000;
					-moz-perspective: 1000;
					perspective: 1000;
				}
				.slick-slider * {
					min-height: 0;
					min-width: 0;
				}
			`}</style>
			<div className="slider-container relative group">
				<Slider ref={sliderRef} {...settings}>
					{data.map((item) => (
						<SlideItem key={item.id} item={item} />
					))}
				</Slider>
			</div>
		</div>
	);
};

export default memo(SliderComponent);
