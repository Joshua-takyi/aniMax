"use client";
import useSearch from "@/strore/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export default function SearchComponent() {
	const search = useSearch((state) => state.search);

	return (
		<div className="relative max-w-md w-full">
			<Input
				type="text"
				value={search}
				className="p-4 rounded-md border "
				onChange={(e) => useSearch.setState({ search: e.target.value })}
				placeholder="Search anime..."
			/>
			<Button
				size="icon"
				className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 cursor-pointer"
				variant="ghost"
			>
				<Search className="h-4 w-4 " />
			</Button>
		</div>
	);
}
