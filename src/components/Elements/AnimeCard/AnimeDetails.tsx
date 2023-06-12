import React from "react";

import {
	GetPopularAnimeResponse,
	Media,
	MediaNextAiringEpisode,
	MediaStudio,
} from "@/src/types/anime";
import { getEmoji, convertTimeUntilAiring } from "@/src/util";

import AnimeDetailsWrapper from "@/src/components/Elements/AnimeCard/AnimeDetailsWrapper";

interface AnimeDetailsProps {
	isVisible: boolean;
	animeDetails: Media | null;
	isLastCard: boolean;
	nextEpisodeDays: number | null;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	isVisible,
	animeDetails,
	isLastCard,
}) => {
	const nextEpisodeDays = animeDetails?.nextAiringEpisode
		? Math.floor(animeDetails.nextAiringEpisode.timeUntilAiring / 86400)
		: null;
	const currentEpisode =
		animeDetails?.nextAiringEpisode?.episode &&
		animeDetails.nextAiringEpisode.episode > 1
			? animeDetails.nextAiringEpisode.episode - 1
			: null;
	const hoursUntilNextEpisode =
		animeDetails?.nextAiringEpisode?.timeUntilAiring;

	const studioName = animeDetails?.studios?.nodes[0]?.name || "Unknown";
	const likedPercentage = animeDetails?.averageScore;

	const {
		episodes: totalEpisodes,
		genres = [],
		status,
		season,
		seasonYear,
	} = animeDetails;

	return (
		<AnimeDetailsWrapper isLastCard={isLastCard} isVisible={isVisible}>
			<div className="flex flex-col flex-wr">
				<div className="w-full flex justify-between font-medium">
					{status === "FINISHED" ? (
						<>
							<div className="w-full flex items-center justify-between font-medium">
								<div className="text-lg flex gap-1 text-gray-700">
									<h6>
										{season?.split("")[0] + season?.slice(1).toLowerCase()}
									</h6>{" "}
									<h6>{`${seasonYear}`}</h6>
								</div>
								<div>
									{getEmoji(likedPercentage)} {likedPercentage}%
								</div>
							</div>
						</>
					) : (
						<>
							<div className="w-3/4">
								<h6 className="text-lg text-gray-800">
									Ep {!!currentEpisode && currentEpisode + 1} airing in
									{nextEpisodeDays
										? ` ${nextEpisodeDays} days`
										: ` ${convertTimeUntilAiring(hoursUntilNextEpisode)} hours`}
								</h6>
							</div>
							<span>
								{getEmoji(likedPercentage)} {likedPercentage}%
							</span>
						</>
					)}
				</div>
			</div>
			<div className="w-full pt-4 pb-6">
				<h6 className="text-xs text-gray-800 font-semibold">{studioName}</h6>
				<div className="w-full flex gap-2 text-gray-800">
					<p className="text-xs">TV SHOW</p>
					<span
						className="material-icons pt-1 grid place-items-center text-gray-800"
						style={{ fontSize: "7px" }}
					>
						fiber_manual_record
					</span>
					<p className="text-xs">{totalEpisodes} episodes</p>
				</div>
			</div>
			<div className="w-full  flex flex-wrap gap-2">
				{genres.slice(0, 3).map((genre: any, i: number) => (
					<p className="text-xs bg-yellow-300 rounded-3xl px-2 py-1" key={i}>
						{genre?.toLowerCase()}
					</p>
				))}
			</div>
		</AnimeDetailsWrapper>
	);
};

export default AnimeDetails;
