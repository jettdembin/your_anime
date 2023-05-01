export const metadata = {
	title: "Your Anime",
};

import client from "@/apollo-client";

import getQueryClient from "./getQueryClient";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "../util/HydrateClient";

import {
	GET_POPULAR_ANIME,
	GET_TOP_100_ANIME,
	GET_TRENDING,
} from "@/src/graphql/queries";

import Header from "../components/Pages/Home/Header";
import Nav from "../components/Layout/Nav";
import { ContentLayout } from "../components/Layout/ContentLayout";

import TopAnimeList from "../components/Pages/Home/TopAnimeList";
import Browse from "../components/Browse";
import PopularAnime from "../components/PopularAnime";
import Search from "../components/Search";

// const fetchAnime = async () => {
// 	const { data } = await client.query({
// 		query: GET_POPULAR_ANIME,
// 	});
// };

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
const trendingAnimePost = async () => {
	try {
		const { data } = await client.query({
			query: GET_TRENDING,
		});
		return data;
	} catch (err) {
		console.error(err);
	}
};
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

export default async function Home() {
	return (
		<div>
			<nav className="h-20 px-8 bg-gray-800 flex items-center justify-center">
				<Nav />
			</nav>
			<header className="max-w-7xl sm:mx-20 xl:mx-auto relative bg-gray-800 py-16 px-10 shadow-2xl mt-12 lg:rounded-3xl">
				<Header />
			</header>

			<main className="mx-16">
				<Search />

				<ContentLayout title="TRENDING NOW">
					<Browse />
				</ContentLayout>

				<ContentLayout title="POPULAR ANIME">
					<PopularAnime />
				</ContentLayout>

				<ContentLayout title="TOP 100 ANIME">
					<TopAnimeList />
				</ContentLayout>
			</main>
		</div>
	);
}
