"use client";

import Link from "next/link";

import client from "@/apollo-client";
import { useQuery } from "@tanstack/react-query";

import { GET_TOP_100_ANIME } from "@/src/graphql/queries";
import { formatDate, formatGenres, formatMediaType } from "@/src/util/format";

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
		<div className="max-w-7xl mx-auto">
			<ul>
				{data.Page.media.slice(0, 10).map((anime, index) => (
					<li key={anime.id} className="flex items-center mb-4">
						<span className="w-8 mr-4 font-bold text-xl text-8ba0b2">
							#{index + 1}
						</span>
						<div className="flex flex-grow items-center bg-white rounded-md shadow-box p-4">
							<img
								className="w-20 h-28 object-cover mr-4"
								src={anime.coverImage.medium}
								alt={anime.title.english || "Anime Cover"}
							/>
							<div>
								<h3 className="font-semibold text-lg">{anime.title.english}</h3>
								<p className="text-sm">{formatGenres(anime.genres)}</p>
							</div>
							<div className="ml-auto">
								<p>{`${anime.averageScore}%`}</p>
								<p className="text-sm">{`${anime.popularity} users`}</p>
							</div>
							<div className="ml-4">
								<p>{formatMediaType(anime.format)}</p>
								<p className="text-sm">{`${anime.episodes} eps`}</p>
							</div>
							<div className="flex flex-col ml-4">
								<span>
									{formatDate(anime.endDate || anime.startDate, "seasonYear")}
								</span>
								{anime.status === "RELEASING" && anime.nextAiringEpisode ? (
									<span className="text-sm text-gray-500">
										Ep {anime.nextAiringEpisode.episode} airing in{" "}
										{Math.floor(
											anime.nextAiringEpisode.timeUntilAiring / 86400
										)}{" "}
										days
									</span>
								) : (
									<span className="text-sm text-gray-500">{anime.status}</span>
								)}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
