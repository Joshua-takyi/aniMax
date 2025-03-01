// "use client";

// import { ReactNode, useEffect, useRef } from "react";
// import Lenis from "lenis";

// interface SmoothScrollProps {
// 	children: ReactNode;
// 	options?: {
// 		lerp?: number; // Linear interpolation factor (0-1) - lower means smoother but slower
// 		duration?: number; // Duration of the scroll animation in seconds
// 		smoothWheel?: boolean; // Enable/disable smooth scrolling for mouse wheel
// 		smoothTouch?: boolean; // Enable/disable smooth scrolling for touch devices
// 		wheelMultiplier?: number; // Adjust the speed of wheel scrolling
// 		touchMultiplier?: number; // Adjust the speed of touch scrolling
// 		infinite?: boolean; // Enable/disable infinite scrolling
// 	};
// }

// /**
//  * SmoothScroll component using Lenis for smooth scrolling
//  *
//  * This component initializes a Lenis scroller and wraps children components
//  * to provide smooth scrolling throughout the application.
//  *
//  * @param {ReactNode} children - The child components to be rendered with smooth scrolling
//  * @param {Object} options - Configuration options for Lenis scrolling behavior
//  */
// export default function SmoothScroll({
// 	children,
// 	options = {
// 		lerp: 0.1,
// 		duration: 1.2,
// 		smoothWheel: true,
// 		smoothTouch: false,
// 		wheelMultiplier: 1,
// 		touchMultiplier: 2,
// 		infinite: false,
// 	},
// }: SmoothScrollProps) {
// 	// Use a ref to persist the Lenis instance across renders
// 	const lenisRef = useRef<Lenis | null>(null);

// 	useEffect(() => {
// 		// Initialize Lenis smooth scrolling
// 		const lenis = new Lenis({
// 			...options,
// 			// Set wrapper and content to document defaults for page scrolling
// 			wrapper: window.document.documentElement,
// 			content: document.documentElement,
// 		});

// 		// Store the instance in ref
// 		lenisRef.current = lenis;

// 		// Setup a RAF loop for smooth animation
// 		function raf(time: number) {
// 			if (lenisRef.current) {
// 				lenisRef.current.raf(time);
// 			}
// 			requestAnimationFrame(raf);
// 		}

// 		// Start the animation loop
// 		requestAnimationFrame(raf);

// 		// Clean up when component unmounts
// 		return () => {
// 			if (lenisRef.current) {
// 				lenisRef.current.destroy();
// 				lenisRef.current = null;
// 			}
// 		};
// 	}, [options]);

// 	// Add scroll to hash functionality
// 	useEffect(() => {
// 		// Add support for scroll-to-hash when page loads
// 		if (typeof window !== "undefined") {
// 			const { hash } = window.location;
// 			if (hash) {
// 				const id = hash.replace("#", "");
// 				const element = document.getElementById(id);

// 				// Allow time for Lenis to initialize
// 				setTimeout(() => {
// 					element?.scrollIntoView({ behavior: "smooth" });
// 				}, 500);
// 			}
// 		}
// 	}, []);

// 	/**
// 	 * Method to access the lenis instance from parent components
// 	 * This can be accessed using a ref on this component
// 	 */
// 	// const getLenisInstance = () => lenisRef.current;

// 	// Return children wrapped in a div with a data attribute for identification
// 	return <div data-lenis-wrapper>{children}</div>;
// }

// /**
//  * A hook to scroll to specific elements smoothly using Lenis
//  *
//  * Example usage:
//  * const scrollTo = useScrollTo();
//  * <button onClick={() => scrollTo('#section-id')}>Scroll to Section</button>
//  */
// // Extend the Window interface to include the lenis property
// declare global {
// 	interface Window {
// 		lenis?: Lenis;
// 	}
// }

// export function useScrollTo() {
// 	return (
// 		target: string | HTMLElement,
// 		options?: { offset?: number; duration?: number }
// 	) => {
// 		// Get the Lenis instance from the window if available
// 		const lenis = window.lenis;

// 		if (!lenis) {
// 			console.warn("Lenis instance not found");
// 			return;
// 		}

// 		// Scroll to the target element
// 		lenis.scrollTo(target, {
// 			offset: options?.offset || 0,
// 			duration: options?.duration || 1,
// 			immediate: false,
// 		});
// 	};
// }
