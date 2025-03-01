"use client";
import { GetCharactersByAnimeId } from "@/action";
import Loader from "@/app/loading";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// TypeScript interfaces for character data structure
interface CharacterImage {
	webp?: {
		image_url: string;
	};
}

interface AnimeCharacter {
	mal_id: number;
	name: string;
	images?: CharacterImage;
}

interface VoiceActor {
	language: string;
	person: {
		name: string;
	};
}

interface CharacterData {
	character: AnimeCharacter;
	role: string;
	voice_actors?: VoiceActor[];
}

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

		// Using React Query to fetch and manage character data
		const { data, isLoading, error } = useQuery({
			queryKey: ["anime-characters", id],
			queryFn: async () => {
				const result = await GetCharactersByAnimeId({ animeId: id });
				return result.data || ([] as CharacterData[]);
			},
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
		});

		// Show loading state
		if (isLoading) return <Loader />;

		// Handle error state
		if (error) {
			console.error("Error fetching characters:", error);
			return <div className="p-4 rounded-lg">Error loading characters</div>;
		}

		// Handle empty data
		if (!data || data.length === 0) {
			return <div className="p-4 rounded-lg">No character data available</div>;
		}

		// Determine if we need the "See All" button
		const hasMoreCharacters = data.length > initialLimit;
		// Characters to display based on current state
		const displayedCharacters = showAll ? data : data.slice(0, initialLimit);

		return (
			<div className="space-y-6 px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
					{displayedCharacters.map((character: CharacterData) => {
						// Find only the Japanese voice actor for each character
						const japaneseVA = character.voice_actors?.find(
							(va: VoiceActor) => va.language === "Japanese"
						);

						return (
							<div
								key={character.character.mal_id}
								className="flex flex-col items-center space-y-2"
							>
								{/* Character Image */}
								<div className="relative w-28 h-28 mb-2">
									<Image
										src={
											character.character.images?.webp?.image_url ||
											"/default-character-image.jpg"
										}
										alt={character.character.name}
										fill
										sizes="(max-width: 640px) 112px, 112px"
										className="rounded-md object-cover"
									/>
								</div>

								{/* Character Info */}
								<h2 className="font-semibold text-sm text-center truncate w-full">
									{character.character.name}
								</h2>
								<p className="text-xs text-center text-gray-600">
									{character.role}
								</p>

								{/* Japanese VA Info - Only show if available */}
								{japaneseVA && (
									<div className="flex flex-col items-center mt-2">
										<p className="text-xs font-medium text-center">
											Voice Actor
										</p>
										<p className="text-xs text-center">
											{japaneseVA.person.name}
										</p>
									</div>
								)}
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
