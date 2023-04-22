"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import client from "@/apollo-client";
import { GET_POPULAR_ANIME } from "@/src/graphql/queries";

import { useQuery } from "@tanstack/react-query";

export default function PopularAnime() {
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

	const { isLoading, isError, error, data } = useQuery({
		queryKey: ["popularAnime"],
		queryFn: popularAnimePost,
	});

	if (data) console.log(data, "data");
	if (isLoading) return <p>Loading...</p>;
	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
			{data.Page.media.map((anime) => (
				<div key={anime.id}>
					<h3>{anime.title.english || anime.title.native}</h3>
					<img
						src={anime.coverImage.large}
						alt={anime.title.english || anime.title.native}
					/>
				</div>
			))}
		</section>
	);
}
