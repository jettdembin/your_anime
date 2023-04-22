"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import client from "@/apollo-client";
import { GET_POPULAR_ANIME } from "@/src/graphql/queries";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../util/fetchData";

export default function PopularAnime() {
	const [anime, setAnime] = useState([]);
	// const fetchAnime = async () => {
	// 	const { data } = await client.query({
	// 		query: GET_POPULAR_ANIME,
	// 	});
	// 	return setAnime(data);
	// };

	const animePost = async () => {
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
		queryFn: animePost,
	});

	if (data) console.log(data, "data");
	if (isLoading) return <p>Loading...</p>;
	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<h1>Data from React QUery</h1>
			{data.Page.media.map((anime) => (
				<div key={anime.id}>
					<h3>{anime.title.english || anime.title.native}</h3>
					<img
						src={anime.coverImage.large}
						alt={anime.title.english || anime.title.native}
					/>
				</div>
			))}
		</div>
	);
}
