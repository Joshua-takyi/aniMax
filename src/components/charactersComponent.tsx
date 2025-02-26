"use client";
import { GetCharactersByAnimeId } from "@/action";
import Loader from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

interface CharacterProps {
	id: string;
	initialLimit?: number;
}

const CharacterComponent: React.FC<CharacterProps> = React.memo(
	({
		id,
		initialLimit = 6, // Default to showing 6 characters initially
	}) => {
		const [showAll, setShowAll] = useState(false);

		const { data, isLoading, error } = useQuery({
			queryKey: ["characters", id],
			queryFn: async () => {
				const res = await GetCharactersByAnimeId({
					animeId: id,
				});
				return res.data;
			},
		});

		if (isLoading) return <Loader />;
		if (error)
			return <div className="p-4 rounded-lg">Error loading characters</div>;
		if (!data || !Array.isArray(data) || data.length === 0)
			return <div className="p-4 rounded-lg">No characters found</div>;

		// Determine if we need the "See All" button
		const hasMoreCharacters = data.length > initialLimit;
		// Characters to display based on current state
		const displayedCharacters = showAll ? data : data.slice(0, initialLimit);

		return (
			<div className="space-y-6 px-2">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6">
					{displayedCharacters.map((character) => {
						// Find the main Japanese and English voice actors for each character
						const japaneseVA = character.voice_actors.find(
							(va: { language: string }) => va.language === "Japanese"
						);
						const englishVA = character.voice_actors.find(
							(va: { language: string }) => va.language === "English"
						);

						return (
							<div
								key={character.character.mal_id}
								className="flex items-start space-x-3"
							>
								<div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
									<Image
										src={
											character.character.images.webp.image_url ||
											"/default-character-image.jpg"
										}
										alt={character.character.name}
										fill
										sizes="(max-width: 640px) 64px, 80px"
										className="rounded-md object-cover"
									/>
								</div>
								<div className="flex flex-col space-y-1 text-xs sm:text-sm">
									<h2 className="font-semibold truncate max-w-[180px] sm:max-w-[200px]">
										{character.character.name}
									</h2>
									<p className="truncate max-w-[180px] sm:max-w-[200px]">
										{character.role}
									</p>
									{japaneseVA && (
										<p className="truncate max-w-[180px] sm:max-w-[200px]">
											JP: {japaneseVA.person.name}
										</p>
									)}
									{englishVA && (
										<p className="truncate max-w-[180px] sm:max-w-[200px]">
											EN: {englishVA.person.name}
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{/* Show "See All" button only if there are more characters */}
				{hasMoreCharacters && (
					<div className="flex justify-center mt-6">
						<button
							onClick={() => setShowAll(!showAll)}
							className="px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 hover:shadow-md"
						>
							{showAll ? "Show Less" : `See All Characters (${data.length})`}
						</button>
					</div>
				)}
			</div>
		);
	}
);

CharacterComponent.displayName = "CharacterComponent";

export default CharacterComponent;
