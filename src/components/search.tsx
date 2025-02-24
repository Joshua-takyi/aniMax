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
		router.push(`/search?q=${encodeURIComponent(search)}`);
		if (search) {
			useSearch.setState({ search: "" });
		}
	};

	return (
		<div className=" max-w-md w-full flex items-center ">
			<Input
				type="text"
				value={search}
				className={`py-6 px-3 rounded-l-full outline-none transition-all duration-300 ease-in-out`}
				onChange={(e) => useSearch.setState({ search: e.target.value })}
				placeholder="Search anime..."
				onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
			/>
			<Button
				size="lg"
				role="submit"
				onClick={handleSubmit}
				className="cursor-pointer rounded-r-full py-6 transition-all duration-300 ease-in-out hover:bg-primary/90"
			>
				<Search />
			</Button>
		</div>
	);
}
