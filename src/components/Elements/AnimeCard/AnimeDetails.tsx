import React from "react";
import {
	GetPopularAnimeResponse,
	Media,
	MediaNextAiringEpisode,
	MediaStudio,
} from "@/src/types/anime";

import AnimeDetailsWrapper from "@/src/components/Elements/AnimeCard/AnimeDetailsWrapper";

interface AnimeDetailsProps {
	isVisible: boolean;
	animeDetails: Media | null;
	isLastCard: boolean;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	isVisible,
	animeDetails,
	isLastCard,
}) => {
	const nextEpisodeDays = animeDetails?.nextAiringEpisode
		? Math.floor(animeDetails.nextAiringEpisode.timeUntilAiring / 86400)
		: null;

	const studioName = animeDetails?.studios?.nodes[0]?.name || "Unknown";
	const likedPercentage = animeDetails?.averageScore;
	const currentEpisode =
		animeDetails?.nextAiringEpisode?.episode &&
		animeDetails.nextAiringEpisode.episode > 1
			? animeDetails.nextAiringEpisode.episode - 1
			: null;

	const { episodes, genres = [], status, season, seasonYear } = animeDetails;

	const totalEpisodes = episodes || null;

	const emoji = (percent: number | undefined) => {
		if (!percent) return;
		switch (true) {
			case percent >= 75:
				return "😍";
			case percent < 75 && percent >= 50:
				return "😐";
			case percent < 50:
				return "😒";
			default:
				"😶";
		}
	};

	if (status === "FINISHED") {
		return (
			<AnimeDetailsWrapper isLastCard={isLastCard} isVisible={isVisible}>
				<div className="flex flex-col flex-wr">
					<div className="w-full flex items-center justify-between font-medium">
						<div className="flex gap-1 text-gray-700">
							<h6 className="text-base">
								{season?.split("")[0] + season?.slice(1).toLowerCase()}
							</h6>{" "}
							{`${seasonYear}`}
						</div>
						<div>
							{emoji(likedPercentage)} {likedPercentage}%
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
							<p className="text-xs">{totalEpisodes} episodes</p>
						</div>
					</div>
					<div className="w-full  flex flex-wrap gap-2">
						{genres.slice(0, 3).map((genre) => (
							<p className="text-xs bg-yellow-300 rounded-3xl px-2 py-1">
								{genre?.toLowerCase()}
							</p>
						))}
					</div>
				</div>
			</AnimeDetailsWrapper>
		);
	}

	const completedAnime = (
		<>
			<p>Total Episodes: {totalEpisodes || "Unknown"}</p>
			<p>Genres: {genres?.join(", ")}</p>
			<p className="text-right">{likedPercentage}% liked</p>
			<p>Studio: {studioName}</p>
		</>
	);

	return (
		<AnimeDetailsWrapper isLastCard={isLastCard} isVisible={isVisible}>
			{nextEpisodeDays ? (
				<>
					<p>Next episode in {nextEpisodeDays} days</p>
					<p>Current Episode: {currentEpisode || "Unknown"}</p>
					{completedAnime}
				</>
			) : (
				<>
					<p>Next episode in {nextEpisodeDays} days</p>
					<p>Completed</p>
					<p>Current Episode: {currentEpisode || "Unknown"}</p>
					{completedAnime}
				</>
			)}
		</AnimeDetailsWrapper>
	);
};

export default AnimeDetails;
