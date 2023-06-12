"use client";

import { useShowAnimeInfo } from "@/src/hooks/useShowAnimeInfo";
import media from "./AnimeCard/media";

import { getEmoji } from "@/src/util";
import AnimeDetails from "./AnimeCard/AnimeDetails";

interface AnimeCardProps {
	media: Media;
	studioName: string;
	nextEpisodeDays: number | null;
	isLastCard: boolean;
}

const titleStudioOverlay = (
	<div className="hidden xl:block z-20 w-full bg-gray-900 h-36 absolute bottom-0 opacity-70"></div>
);

export default function AnimeCard({
	media,
	studioName,
	nextEpisodeDays,
	isLastCard,
}: AnimeCardProps) {
	const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
		useShowAnimeInfo();

	const { epsiodes, genres = [], status, season, seasonYear } = media;

	const likedPercentage = media?.averageScore;

	const currentEpisode =
		media?.nextAiringEpisode?.episode && media.nextAiringEpisode.episode > 1
			? media.nextAiringEpisode.episode - 1
			: null;
	const hoursUntilNextEpisode = media?.nextAiringEpisode?.timeUntilAiring;

	return (
		<div className="relative flex">
			<div
				className="relative w-full h-48 xl:h-72 xl:grid xl:grid-cols-[auto,1fr] bg-gray-700 xl:bg-white rounded-md overflow-hidden group xl:shadow-custom"
				onMouseEnter={() => {
					handleMouseEnter(media.id);
				}}
				onMouseLeave={handleMouseLeave}
			>
				<div className="relative">
					<div className="overflow-hidden">
						<img
							src={media.coverImage.large}
							alt={media.title.english || media.title.native}
							className="w-full h-full object-cover transition duration-300 ease-in-out transform scale-105 group-hover:scale-110 xl:group-hover:scale-105"
						/>
					</div>
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
				<div
					className={`xl:hidden absolute top-0 ${
						!!isLastCard ? "-left-4 left-triangle" : "right-0 right-triangle"
					}`}
				>
					<AnimeDetails
						isVisible={hoveredAnime === media.id}
						animeDetails={media || {}}
						isLastCard={isLastCard}
						nextEpisodeDays={nextEpisodeDays}
					/>
				</div>
			)}

			{/* Content div related to the image */}
			<div className="hidden xl:flex absolute flex-col left-[14.3rem] top-0  w-[25.2rem] h-72">
				<div className="p-4">
					<div className="flex flex-col flex-wr">
						<div className="w-full flex justify-between font-medium">
							<div className="w-3/4">
								<h6 className="text-lg text-gray-800">
									Ep {!!currentEpisode && currentEpisode + 1} airing in
									{nextEpisodeDays === 0
										? ` ${hoursUntilNextEpisode} hours`
										: ` ${nextEpisodeDays} days`}
								</h6>
							</div>
							<span>
								{getEmoji(likedPercentage)} {likedPercentage}%
							</span>
						</div>
					</div>
					<div className="w-full pt-4 pb-6">
						<h6 className="text-xs text-gray-800 font-semibold">
							{studioName}
						</h6>
						<div className="w-full flex gap-2 text-gray-800">
							<p className="text-xs">TV SHOW</p>
							<span
								className="material-icons pt-1 grid place-items-center text-gray-800"
								style={{ fontSize: "7px" }}
							>
								fiber_manual_record
							</span>
							<p className="text-xs">{epsiodes} episodes</p>
						</div>
					</div>
				</div>
				<div className="px-4 py-2 flex justify-between mt-auto bg-genre">
					<div className="flex flex-wrap justify-between gap-2">
						{genres.slice(0, 4).map((genre: any, i: number) => (
							<span
								className="text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1"
								key={i}
							>
								{genre?.toLowerCase()}
							</span>
						))}
					</div>
					<span className="material-icons cursor-pointer text-blue-100">
						loupe
					</span>
				</div>
			</div>
		</div>
	);
}
