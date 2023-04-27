"use client";
import { GET_POPULAR_ANIME, GET_TRENDING } from "@/src/graphql/queries";

import { Media } from "../types/anime";
import { useAnilistAPI } from "../hooks/useAnilistAPI";

// const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Browse() {
	const { error, loading, data } = useAnilistAPI(GET_TRENDING);

	if (data) console.log(data, "data");
	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
			{data.Trending.media.slice(0, 8)?.map((media: Media, i: number) => (
				<div
					key={media.id}
					className="relative w-full h-48 bg-gray-700 rounded-md overflow-hidden group"
				>
					<img
						src={media.coverImage.large}
						alt={media.title.english || media.title.native}
						className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
					<div className="absolute bottom-0 left-0 w-full p-2 text-white transition-all duration-300 ease-in-out group-hover:bottom-2">
						<h3 className="text-sm font-semibold">
							{media.title.english || media.title.native}
						</h3>
					</div>
				</div>
			))}
		</section>
	);
}
