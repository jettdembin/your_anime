"use client";

import { Media } from "../../../types/anime";

import { GET_POPULAR_ANIME, usePopularAnime } from "@/src/graphql/queries";

import { AnimeCardLayout } from "../../Layout/AnimeCardLayout";
import { CardSectionLoader } from "../../Elements/LoadingSection";
import AnimeCard from "./ui/AnimeCard";
import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";

export default function PopularAnime() {
	// const { error, loading, data } = usePopularAnime(1);
	const { error, loading, data } = useAnilistAPI(GET_POPULAR_ANIME);

	if (loading) return <CardSectionLoader />;
	if (error) {
		console.log(error, "error");
		return <p>Error: {error.message}</p>;
	}

	return (
		<AnimeCardLayout>
			{data.Page.media.slice(0, 12).map((anime: Media, i: number) => {
				return <AnimeCard key={i} media={anime} />;
			})}
		</AnimeCardLayout>
	);
}
