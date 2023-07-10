"use client";

import AnimeCard from "@/src/components/Layout/AnimeGrid/AnimeCard";
import { Media } from "@/src/types/anime";

export default function AnimeGrid({ data }) {
	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
			{data.Trending.media.slice(0, 8)?.map((media, i) => (
				<AnimeCard media={media} key={i} />
			))}
		</section>
	);
}
