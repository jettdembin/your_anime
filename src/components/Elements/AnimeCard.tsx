"use client";

import { Anime } from "../../util/models";

import { useShowAnimeInfo } from "@/src/hooks/useShowAnimeInfo";
import AnimeDetails from "../Pages/Home/AnimeDetails";
import { useEffect } from "react";

const titleStudioOverlay = (
	<div className="hidden xl:block z-20 w-full bg-gray-900 h-36 absolute bottom-0 opacity-70"></div>
);

export default function AnimeCard({ media, studioName, nextEpisodeDays }) {
	const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
		useShowAnimeInfo();

	useEffect(() => {
		if (!hoveredAnime) return;
		const anime = hoveredAnime;
		debugger;
	}, [hoveredAnime]);
	return (
		<div className="relative">
			<div
				className="relative w-full h-48 xl:h-72 xl:grid xl:grid-cols-[auto,1fr] bg-gray-700 xl:bg-white rounded-md overflow-hidden group xl:shadow-custom"
				onMouseEnter={() => {
					handleMouseEnter(media.id);
				}}
				onMouseLeave={handleMouseLeave}
			>
				<div className="relative">
					<img
						src={media.coverImage.large}
						alt={media.title.english || media.title.native}
						className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110 xl:group-hover:scale-100"
					/>
					{titleStudioOverlay}
					<div className="hidden p-4 z-30 xl:block absolute w-full h-36 bottom-0">
						<h3 className="text-white font-semibold text-base">
							{media.title.english || media.title.native}
						</h3>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-0 xl:bg-transparent xl:opacity-0"></div>
				<div className="absolute bottom-0 left-0 w-full p-2 text-white transition-all duration-300 ease-in-out group-hover:bottom-2 xl:group-hover:bottom-0  xl:relative xl:p-4 ">
					<h3 className="text-sm font-semibold lg:text-base">
						{media.title.english || media.title.native}
					</h3>
					{/* Add more information here as needed for large screens */}
				</div>
			</div>
			{hoveredAnime === media.id && (
				<div className="xl:hidden absolute top-0 right-2">
					<AnimeDetails
						isVisible={hoveredAnime === media.id}
						nextEpisodeDays={nextEpisodeDays}
						likedPercentage={media.averageScore}
						studioName={studioName}
						currentEpisode={
							media.nextAiringEpisode?.episode
								? media.nextAiringEpisode.episode - 1
								: null
						}
						totalEpisodes={media.episodes}
						genres={media.genres}
					/>
				</div>
			)}
		</div>
	);
}
