import NewReleases from "@/components/newReleases";
import { HeroSection } from "./hero";
import HandPicked from "./handPicked";
import FeaturedContent from "./featuredContent";

export default function Home() {
	return (
		<div>
			<HeroSection />
			<NewReleases />
			<FeaturedContent />
		</div>
	);
}
