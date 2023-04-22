"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import axios from "axios";

import client from "@/apollo-client";
import { GET_POPULAR_ANIME, GET_TRENDING } from "@/src/graphql/queries";

import { useQuery } from "@tanstack/react-query";
import { Media } from "../types/anime";

// const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Browse() {
	const trendingAnimePost = async () => {
		try {
			const { data } = await client.query({
				query: GET_TRENDING,
			});
			return data || {};
		} catch (err) {
			console.error(err);
		}
	};

	const { isLoading, isError, error, data } = useQuery({
		queryKey: ["trendingAnime"],
		queryFn: trendingAnimePost,
	});

	if (data) console.log(data, "data");
	if (isLoading) return <p>Loading...</p>;
	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<section>
			<div className="flex">
				<div className="flex flex-grow basis-full py-2 border rounded-md bg-white shadow-lg">
					<span className="px-2">🔎</span>
					<input className="focus:outline-none w-full" placeholder="Search" />
				</div>
				<div className="flex items-center justify-center flex-grow ml-2 px-2 bg-white rounded-md border shadow-lg cursor-pointer">
					Menu
				</div>
			</div>
			<div className="mt-6">
				<h3 className="py-4">TRENDING NOW</h3>
				<div className="flex"></div>
			</div>

			<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
				{data.Trending.media.map((media: Media, i: number) => (
					<div className="flex overflow-y-scroll overflow-x-hidden" key={i}>
						<a
							href={`/anime/${media.id}`}
							key={media.id}
							className="group rounded-lg shadow-lg overflow-hidden transition duration-500 hover:scale-105"
						>
							<div
								style={{
									width: "100%",
									height: "50%",
									position: "relative",
								}}
							>
								<img
									layout="fill"
									src={media.coverImage.large}
									alt={media.title.romaji}
								/>
							</div>
							<div className="py-1">
								<div className="px-6">
									<div className="font-bold text-xl mb-2 text-gray-800">
										{media.title.romaji}
									</div>
									<p className="text-grey-700 text-base">
										{media?.synonyms?.slice(0, 100)}...
									</p>
								</div>
								<div className="flex flex-wrap px-6 py-4">
									<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
										#{media.format}
									</span>
									<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
										{media.status}
									</span>
									{media.genres.map((genre) => (
										<span
											key={genre}
											className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
										>
											{genre}
										</span>
									))}
								</div>
							</div>
						</a>
					</div>
				))}
			</section>
		</section>
	);
}
