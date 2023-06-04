"use client";

import { Media } from "../types/anime";

import { useTrendingAnime } from "@/src/graphql/queries";

import { AnimeCardLayout } from "./Layout/AnimeCardLayout";
import AnimeCard from "./Elements/AnimeCard";
import { CardSectionLoader } from "./Elements/LoadingSection";

// const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Browse() {
	const { error, loading, data } = useTrendingAnime();

	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<AnimeCardLayout>
			{data.Trending.media.slice(0, 8)?.map((media: Media, i: number) => (
				<AnimeCard key={i} media={media} />
			))}
		</AnimeCardLayout>
	);
}
