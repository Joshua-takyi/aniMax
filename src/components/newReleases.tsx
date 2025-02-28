"use client";
import React from "react";
import { ImagesSection } from "@/dataset/db";
import SliderComponent from "./slider";
import HomeWrapper from "./homeWrapper";

const NewReleases: React.FC = () => {
	return (
		<section className="lg:py-10 py-3">
			<HomeWrapper className="flex flex-col gap-5">
				<div className="flex flex-col justify-center items-center gap-">
					<h2 className="lg:text-[2.9rem] font-bold mb-4 px-4 text-center">
						New Releases
					</h2>
					<p className="text-[1.2rem]  text-center max-w-lg opacity-80">
						Discover the latest anime series and movies.
					</p>
				</div>

				<SliderComponent data={ImagesSection} />
			</HomeWrapper>
		</section>
	);
};

export default NewReleases;
