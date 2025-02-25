import { SideBar } from "@/components/select";
import { animeGenres } from "@/dataset/db";
import Wrapper from "@/components/wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<Wrapper>
				<div className="flex relative">
					<main className="flex-1 md:p-6">{children}</main>
					<SideBar data={animeGenres} />
				</div>
			</Wrapper>
		</div>
	);
}
