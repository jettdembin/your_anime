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

	const { episodes, genres, status, season, seasonYear } = animeDetails;

	const totalEpisodes = episodes || null;

	if (status === "FINISHED") {
		return (
			<AnimeDetailsWrapper isLastCard={isLastCard} isVisible={isVisible}>
				<div className="flex flex-wr">
					{likedPercentage} {episodes}, {genres}, {status}, {season},{" "}
					{`${seasonYear}`}
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
