"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import useSearch from "@/store/store";

export default function SearchComponent() {
	const router = useRouter();
	const search = useSearch((state: { search: string }) => state.search);

	const handleSubmit = () => {
		router.push(`/search?q=${encodeURIComponent(search)}&type=tv,movie`);
		if (search) {
			useSearch.setState({ search: "" });
		}
	};

	return (
		<div className="max-w-lg w-full flex items-center  duration-300">
			<Input
				type="text"
				value={search}
				className="py-6 px-5 border-r-0 rounded-l-full ring-0 outline-none placeholder:text-slate-400"
				onChange={(e) => useSearch.setState({ search: e.target.value })}
				placeholder="Search for your favorite anime..."
				onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
			/>
			<Button
				size="lg"
				role="submit"
				onClick={handleSubmit}
				className="cursor-pointer rounded-r-full py-6 px-5 border-l-0 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out hover:scale-[1.02]"
				aria-label="Search anime"
			>
				<Search className="h-5 w-5" />
			</Button>
		</div>
	);
}
