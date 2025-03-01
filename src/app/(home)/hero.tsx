"use client";
import HomeWrapper from "@/components/homeWrapper";
import { MotionedBtn } from "@/components/motionedBtn";

export const HeroSection = () => {
	return (
		<section className="relative lg:bg-[url(/images/hero.jpg)] bg-[url(/images/aa73de7b-amcp-app-lp-ott-f_100000013e0u006y000000.jpg)] bg-cover bg-no-repeat bg-center lg:h-[60dvh] h-[60dvh]">
			<div className="bg-black/70 absolute inset-0 " />
			<HomeWrapper className="h-full text-white">
				<div className=" flex flex-col justify-center items-center w-full h-full ">
					{/* CHANGED: Updated the heading text from "Animax" to "AnimeVerse" */}
					<h1
						className=" relative font-bold px-2  uppercase tracking-tight"
						style={{ fontSize: "clamp(3rem,12vw,6rem)" }}
					>
						Aniverse
					</h1>

					<p className="text-lg md:text-xl text-center max-w-lg mb-6 opacity-90">
						Discover the ultimate collection of anime series and movies
					</p>

					<MotionedBtn text="explore now" />
				</div>
			</HomeWrapper>
		</section>
	);
};
