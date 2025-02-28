import HomeWrapper from "@/components/homeWrapper";
import { MotionedBtn } from "@/components/motionedBtn";

export default function FeaturedContent() {
	return (
		// Section with full viewport width and responsive height
		// lg:h-[70dvh] - 70% of viewport height on larger screens
		// h-[60dvh] - 60% of viewport height on mobile screens
		<section className="lg:bg-[url(/animax/113fdbfd-heroimages-swimlanes-03dubs-danmachiv.jpg)] bg-cover bg-no-repeat h-[70dvh]  lg:px-10 bg-[url(/animax/eis-02-1040x1560.original.jpg)]">
			<HomeWrapper className="flex h-[100%] w-full items-center">
				<div className="flex flex-col text-white lg:w-5xl gap-4 w-full lg:p-10 p-4">
					<h3 className="lg:text-[4rem] text-[1.6rem] capitalize font-bold max-w-lg w-full leading-tight">
						we know what you like, <br />
					</h3>

					<p className="text-lg mb-4">browse through our collection of anime</p>

					<MotionedBtn text="search for the anime" />
				</div>
			</HomeWrapper>
		</section>
	);
}
