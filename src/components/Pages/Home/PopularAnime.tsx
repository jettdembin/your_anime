"use client";

import { useState } from "react";

import client from "@/apollo-client";
import { useQuery } from "@apollo/client";

import { Media } from "../../../types/anime";
import { GET_POPULAR_ANIME, usePopularAnime } from "@/src/graphql/queries";

import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { useShowAnimeInfo } from "@/src/hooks/useShowAnimeInfo";

import AnimeDetails from "../../Elements/AnimeCard/AnimeDetails";
import { AnimeCardLayout } from "../../Layout/AnimeCardLayout";
import { CardSectionLoader } from "../../Elements/LoadingSection";
import AnimeCard from "../../Elements/AnimeCard";

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
				return <AnimeCard key={i} media={anime} />;
			})}
		</AnimeCardLayout>
	);
}
