import SearchComponent from "@/components/search";
import Wrapper from "@/components/wrapper";

export default function HeroSection() {
	return (
		<main className=" md:h-[60vh] overflow-hidden bg-[url(/images/wallpaperflare.com_wallpaper.jpg)] bg-cover bg-center bg-no-repeat h-[80dvh] relative backdrop-grayscale-50">
			<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
			<Wrapper className="relative z-10 h-full flex flex-col items-start justify-center">
				<div className="gap-4 flex flex-col">
					<div className="flex gap-4">
						<h1 className="text-[3.4rem] font-bold text-white">AniWise</h1>
					</div>
					<div>
						<SearchComponent />
					</div>
					<p className="text-xl font-medium max-w-3xl text-balance text-gray-200">
						Discover the best anime content, from classic series to the latest
						releases. Your journey into the world of anime starts here.
					</p>
				</div>
			</Wrapper>
		</main>
	);
}
