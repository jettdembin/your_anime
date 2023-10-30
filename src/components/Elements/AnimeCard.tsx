"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Media } from "@/src/types/anime";

import { useShowAnimeInfo } from "@/src/hooks/useShowAnimeInfo";

import ListType from "./AnimeCard/ListType";
import CardType from "./AnimeCard/CardType";
import AnimeDetails from "./AnimeCard/AnimeDetails";
import AnimeCardLong from "./ListType";
import { useCardTypeContext } from "../../Discover/context/CardTypeContext";

interface AnimeCardProps {
	media: Media;
	isLastCard?: boolean;
}

export default function AnimeCard({ media, isLastCard }: AnimeCardProps) {
	const router = useRouter();
	const { cardType } = useCardTypeContext();
	const [isCardHovered, setIsCardHovered] = useState(false);
	const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
		useShowAnimeInfo();

	const nextEpisodeDays = media?.nextAiringEpisode
		? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
		: null;

	const card = (
		<>
			<CardType
				media={media}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
			/>

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
			<ListType
				media={media}
				isCardHovered={isCardHovered}
				setIsCardHovered={setIsCardHovered}
			/>
		</>
	);

	return (
		<div
			className="relative flex"
			onMouseEnter={() => setIsCardHovered(true)}
			onMouseLeave={() => setIsCardHovered(false)}
			onClick={() => {
				router.push(`/anime-details/${media.title.english}`);
				debugger;
			}}
		>
			{cardType === "list" ? <ListCard anime={media} /> : card}
		</div>
	);
}