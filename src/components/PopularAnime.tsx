"use client";

import { useEffect, useState } from "react";
import client from "@/apollo-client";
import { GET_POPULAR_ANIME } from "@/src/graphql/queries";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

export default function PopularAnime() {
	const [anime, setAnime] = useState([]);
	const fetchAnime = async () => {
		const { data } = await client.query({
			query: GET_POPULAR_ANIME,
		});
		return setAnime(data);
	};

	useEffect(() => {
		let ignore;
		if (ignore) return;
		fetchAnime();
		return () => {
			ignore = true;
		};
	}, []);
	// const { isLoading, isError, error, data } = useQuery(["popularAnime"], () =>
	// 	fetchData(GET_POPULAR_ANIME)
	// );

	// if (isLoading) return <p>Loading...</p>;
	// if (isError) {
	// 	console.log(error);
	// 	return <p>Error: {error.message}</p>;
	// }

	return (
		<div>
			test
			{anime?.Page?.media?.map((anime) => (
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
