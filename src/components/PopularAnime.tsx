"use client";

import { useState } from "react";

import client from "@/apollo-client";
import { useQuery } from "@apollo/client";

import { Media } from "../types/anime";
import { GET_POPULAR_ANIME, usePopularAnime } from "@/src/graphql/queries";

import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { useShowAnimeInfo } from "@/src/hooks/useShowAnimeInfo";

import AnimeDetails from "./Pages/Home/AnimeDetails";
import { AnimeCardLayout } from "./Layout/AnimeCardLayout";
import { CardSectionLoader } from "./Elements/LoadingSection.tsx";
import AnimeCard from "./Elements/AnimeCard";

const popularAnimePost = async () => {
	try {
		const { data } = await client.query({
			query: GET_POPULAR_ANIME,
		});
		return data;
	} catch (err) {
		console.error(err);
	}
};
export default function PopularAnime() {
	const { error, loading, data } = usePopularAnime(1);

	if (loading) return <CardSectionLoader />;
	if (error) {
		console.log(error, "error");
		return <p>Error: {error.message}</p>;
	}

	return (
		<AnimeCardLayout>
			{data.Page.media.slice(0, 12).map((anime: Media, i) => {
				const nextEpisodeDays = anime.nextAiringEpisode
					? Math.floor(anime.nextAiringEpisode.timeUntilAiring / 86400)
					: null;
				const studioName = anime.studios.nodes[0]?.name || "Unknown";

				return (
					<AnimeCard
						key={i}
						media={anime}
						studioName={studioName}
						nextEpisodeDays={nextEpisodeDays}
					/>
				);
			})}
		</AnimeCardLayout>
	);
}
