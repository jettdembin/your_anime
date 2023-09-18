"use client";

import { useState } from "react";

import { Media } from "@/src/types/anime";

import { useShowAnimeInfo } from "@/src/hooks/useShowAnimeInfo";

import AnimeDetailsLarge from "./AnimeCard/AnimeDetailsLarge";
import AnimeDetails from "./AnimeCard/AnimeDetails";

interface AnimeCardProps {
	media: Media;
	isLastCard?: boolean;
}

export default function AnimeCard({ media, isLastCard }: AnimeCardProps) {
	const [isCardHovered, setIsCardHovered] = useState(false);
	const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
		useShowAnimeInfo();

	const studioName = media?.studios?.nodes[0]?.name || "Unknown";

	const nextEpisodeDays = media?.nextAiringEpisode
		? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
		: null;

	const titleStudioOverlay = (
		<div className="hidden xl:block z-20 w-full bg-gray-900 h-fit absolute bottom-0 opacity-70 p-4">
			{/* used as a spacer for the opaque background */}
			<h3 className="opacity-0 text-white font-semibold text-base flex flex-col gap-2">
				{media.title.english || media.title.native}
				<span className="text-xs">{studioName}</span>
			</h3>
		</div>
	);

	return (
		<div
			className="relative flex"
			onMouseEnter={() => setIsCardHovered(true)}
			onMouseLeave={() => setIsCardHovered(false)}
		>
			<div
				className="relative w-full h-48 xl:h-72 xl:grid xl:grid-cols-[auto,1fr] bg-gray-700 xl:bg-white rounded-md overflow-hidden group xl:shadow-custom"
				onMouseEnter={() => {
					handleMouseEnter(media.id);
				}}
				onMouseLeave={handleMouseLeave}
			>
				<div className="relative">
					<div className="overflow-hidden max-h-[290px]">
						<img
							src={media.coverImage.large}
							alt={media.title.english || media.title.native}
							className="w-full h-full object-cover transition duration-300 ease-in-out transform scale-105 group-hover:scale-110 xl:group-hover:scale-105"
						/>
					</div>
					{titleStudioOverlay}
					{/* Title for large screens and up*/}
					<div className="hidden p-4 z-30 xl:block absolute w-full h-fit bottom-0">
						<h3 className="h-full flex flex-col gap-2 text-white font-semibold text-base">
							{media.title.english || media.title.native}
							<span className="text-blue-300 text-xs">{studioName}</span>
						</h3>
					</div>
				</div>
				{/* Title on screens up to large */}
				<div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-0 xl:bg-transparent xl:opacity-0"></div>
				<div className="absolute bottom-0 left-0 w-full p-2 text-white transition-all duration-300 ease-in-out group-hover:bottom-2 xl:group-hover:bottom-0  xl:relative xl:p-4 ">
					<h3 className="text-sm font-semibold lg:text-base">
						{media.title.english || media.title.native}
					</h3>
				</div>
			</div>

			{hoveredAnime === media.id && (
				<div
					className={`xl:hidden absolute top-0 ${
						!!isLastCard ? "-left-4 left-triangle" : "right-0 right-triangle"
					}`}
				>
					<AnimeDetails
						isVisible={hoveredAnime === media.id}
						animeDetails={media}
						isLastCard={isLastCard}
						nextEpisodeDays={nextEpisodeDays}
					/>
				</div>
			)}

			{/* Content div related to the image */}
			<AnimeDetailsLarge
				media={media}
				isCardHovered={isCardHovered}
				setIsCardHovered={setIsCardHovered}
			/>
		</div>
	);
}
