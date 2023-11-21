"use client";

import { useTrendingAnime } from "@/graphql/queries";

import { Media } from "../types/anime";

import { GET_TRENDING, useAnilistAPI } from "../graphql/queries";
import AnimeCard from "./Pages/Home/ui/AnimeCard";

// const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Trending() {
	// const { error, loading, data } = useTrendingAnime();
	const { error, loading, data } = useAnilistAPI(GET_TRENDING);

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
			{data.Trending.media.slice(0, 8)?.map((media, i) => (
				<AnimeCard key={i} media={media} />
			))}
		</section>
	);
}
