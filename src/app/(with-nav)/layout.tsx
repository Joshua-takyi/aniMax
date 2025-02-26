import { SideBar } from "@/components/select";
import { animeGenres } from "@/dataset/db";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<div className="flex relative">
				<main className=" md:p-6 flex-1">{children}</main>
				<SideBar data={animeGenres} />
			</div>
		</div>
	);
}
