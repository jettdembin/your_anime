"use client";

import { Media } from "../types/anime";

import { useTrendingAnime } from "@/src/graphql/queries";

import { CardSectionLoader } from "./Elements/LoadingSection";
import AnimeCard from "./Elements/AnimeCard";

// const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Browse() {
	const { error, loading, data } = useTrendingAnime();

	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4">
			{data.Trending.media.slice(0, 8)?.map((media: Media, i: number) => (
				<AnimeCard key={i} media={media} />
			))}
		</section>
	);
}
