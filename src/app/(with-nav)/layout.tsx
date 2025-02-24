import { SideBar } from "@/components/select";
import MainNav from "./component/nav";
import { animeGenres } from "@/dataset/db";
import Wrapper from "@/components/wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<MainNav />
			<Wrapper>
				<div className="flex relative">
					<main className="flex-1 p-6">{children}</main>
					<SideBar data={animeGenres} />
				</div>
			</Wrapper>
		</div>
	);
}
