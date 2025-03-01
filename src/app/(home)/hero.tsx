"use client";
import HomeWrapper from "@/components/homeWrapper";
import { MotionedBtn } from "@/components/motionedBtn";

export const HeroSection = () => {
	return (
		<section className="relative lg:bg-[url(/images/hero.jpg)] bg-[url(/images/aa73de7b-amcp-app-lp-ott-f_100000013e0u006y000000.jpg)] bg-cover bg-no-repeat bg-center h-[calc(100vh-4rem)]">
			<div className="bg-black/70 absolute inset-0" />
			<HomeWrapper className="h-full text-white">
				<div className="flex flex-col justify-center items-center w-full h-full px-4 py-8 space-y-6">
					<h1
						className="relative font-bold px-2 uppercase tracking-tight text-center"
						style={{ fontSize: "clamp(3rem, 12vw, 6rem)" }}
					>
						<span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
							animax
						</span>
					</h1>

					<p className="text-lg md:text-xl lg:text-5xl text-center w-full opacity-90 px-4 animate-fadeIn">
						Search, discover and download your favorite anime series through
						Telegram links
					</p>

					<p className="text-sm md:text-base lg:text-lg text-center max-w-md  px-4 mb-8 relative">
						Find any anime and get instant Telegram download links in seconds
					</p>

					<div className="mt-4 lg:w-[20rem] md:mt-6 transform hover:scale-105 transition-transform duration-300">
						<MotionedBtn text="search anime" />
					</div>
				</div>
			</HomeWrapper>
		</section>
	);
};
