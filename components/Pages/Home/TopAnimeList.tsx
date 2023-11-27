"use client";

import { useAnilistAPI } from "@/hooks/useAnilistAPI";

import { GET_TOP_100_ANIME } from "@/graphql/queries";

import { CardSectionLoader } from "../../ui/LoadingSection";
import AnimeCardLong from "./ui/ListType";

export default function TopAnimeList() {
	const { error, loading, data } = useAnilistAPI(GET_TOP_100_ANIME);

	// if (data) console.log(data, "data");
	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}
	return (
		<div className="max-w-7xl mx-auto">
			<ul>
				{data.Page.media.slice(0, 10).map((anime: any, index: number) => (
					<AnimeCardLong key={anime.id} anime={anime} index={index} />
				))}
			</ul>
		</div>
	);
}
