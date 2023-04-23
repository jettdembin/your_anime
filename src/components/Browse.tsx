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
		</section>
	);
}
