"use client";

import { Media } from "../../../types/anime";

import { GET_TRENDING, useTrendingAnime } from "@/src/graphql/queries";

import { AnimeCardLayout } from "../../Layout/AnimeCardLayout";
import AnimeCard from "./ui/AnimeCard";
import { CardSectionLoader } from "../../Elements/LoadingSection";
import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";

// const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Trending({}) {
	const { error, loading, data } = useAnilistAPI(GET_TRENDING);

	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<AnimeCardLayout>
			{data.Page.media.slice(0, 8)?.map((media: Media, i: number) => (
				<AnimeCard key={i} media={media} />
			))}
		</AnimeCardLayout>
	);
}
