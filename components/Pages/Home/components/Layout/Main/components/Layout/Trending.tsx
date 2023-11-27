"use client";

import { GET_TRENDING } from "@/graphql/queries";
import { GET_POPULAR_ANIME, usePopularAnime } from "@/graphql/queries";
import { Media } from "@/types/anime";

import AnimeCard from "../../../../ui/AnimeCard";
import { useAnilistAPI } from "@/hooks/useAnilistAPI";
import { CardSectionLoader } from "@/components/ui/LoadingSection";
import { AnimeCardLayout } from "@/components/Layout/AnimeCardLayout";

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
