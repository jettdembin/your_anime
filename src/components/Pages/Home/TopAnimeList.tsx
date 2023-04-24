"use client";

import Link from "next/link";

import client from "@/apollo-client";
import { useQuery } from "@tanstack/react-query";

import { GET_TOP_100_ANIME } from "@/src/graphql/queries";

interface TopAnimeListProps {
	animes: Media[];
}

const topAnimePost = async () => {
	try {
		const { data } = await client.query({
			query: GET_TOP_100_ANIME,
		});
		return data;
	} catch (err) {
		console.error(err);
	}
};

export default function TopAnimeList() {
	const { isLoading, isError, error, data } = useQuery({
		queryKey: ["topAnime"],
		queryFn: topAnimePost,
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) {
		return <p>Error: {error.message}</p>;
	}
	return (
		<div className="bg-white p-4 rounded-md shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Top 100 Anime</h2>
				<Link href="/top-100" className="text-blue-600">
					View All
				</Link>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
				{data.Page.media.map((anime, index) => (
					<div key={anime.id} className="flex flex-col items-center">
						<img
							src={anime.coverImage.large}
							alt={anime.title.english}
							className="w-24 h-32 rounded-md shadow-sm"
						/>
						<p className="mt-2 text-sm text-center">
							{index + 1}. {anime.title.english}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
