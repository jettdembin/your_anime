"use client";

import useAnilistAPI from "../hooks/useAnilistAPI";
import { GET_POPULAR_ANIME } from "@/src/graphql/queries";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

export default function PopularAnime() {
	const { isLoading, isError, error, data } = useQuery("popularAnime", () =>
		fetchData(GET_POPULAR_ANIME)
	);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error: {error.message}</p>;

	return data.Page.media.map((anime) => (
		<div key={anime.id}>
			<h3>{anime.title.english || anime.title.native}</h3>
			<Image
				src={anime.coverImage.large}
				alt={anime.title.english || anime.title.native}
			/>
		</div>
	));
}
