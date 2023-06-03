"use client";

import { useState } from "react";

import client from "@/apollo-client";
import { useQuery } from "@apollo/client";

import { Media } from "../types/anime";
import { GET_POPULAR_ANIME, usePopularAnime } from "@/src/graphql/queries";

import { useAnilistAPI } from "../hooks/useAnilistAPI";

import AnimeDetails from "./Pages/Home/AnimeDetails";
import { CardSectionLoader } from "./Elements/LoadingSection.tsx";

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
export default function PopularAnime() {
	const { error, loading, data } = usePopularAnime(1);

	const [hoveredAnime, setHoveredAnime] = useState<number | null>(null);

	const handleMouseEnter = (animeId: number) => {
		setHoveredAnime(animeId);
	};

	const handleMouseLeave = () => {
		setHoveredAnime(null);
	};

	if (loading) return <CardSectionLoader />;
	if (error) {
		console.log(error, "error");
		return <p>Error: {error.message}</p>;
	}

	// console.log(data, "test");

	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 ">
			{data.Page.media.slice(0, 12).map((anime: Media) => {
				const nextEpisodeDays = anime.nextAiringEpisode
					? Math.floor(anime.nextAiringEpisode.timeUntilAiring / 86400)
					: null;
				const studioName = anime.studios.nodes[0]?.name || "Unknown";

				return (
					<div
						key={anime.id}
						className="relative w-full h-48 bg-gray-700 rounded-lg group cursor-pointer"
						onMouseEnter={() => handleMouseEnter(anime.id)}
						onMouseLeave={handleMouseLeave}
					>
						<div className="w-full h-full overflow-hidden rounded-md">
							<img
								src={anime.coverImage.large}
								alt={anime.title.english || anime.title.native}
								className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110 "
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
							<div className="absolute bottom-0 left-0 w-full p-2 text-white transition-all duration-300 ease-in-out group-hover:bottom-2">
								<h3 className="text-sm font-semibold">
									{anime.title.english || anime.title.native}
								</h3>
							</div>
						</div>

						{hoveredAnime === anime.id && (
							<div className="absolute top-0 right-2">
								<AnimeDetails
									isVisible={hoveredAnime === anime.id}
									nextEpisodeDays={nextEpisodeDays}
									likedPercentage={anime.averageScore}
									studioName={studioName}
									currentEpisode={
										anime.nextAiringEpisode?.episode
											? anime.nextAiringEpisode.episode - 1
											: null
									}
									totalEpisodes={anime.episodes}
									genres={anime.genres}
								/>
							</div>
						)}
					</div>
				);
			})}
		</section>
	);
}
