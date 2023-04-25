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
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery(["popularAnime"], popularAnimePost);
	await queryClient.prefetchQuery(["trendingAnime"], trendingAnimePost);
	await queryClient.prefetchQuery(["topAnime"], topAnimePost);

	const dehydratedState = dehydrate(queryClient);

	return (
		<div>
			<nav className="h-20 px-8 bg-gray-800 lg:flex items-center justify-center hidden">
				<Nav />
			</nav>
			<header className="max-w-7xl sm:mx-20 xl:mx-auto relative bg-gray-800 py-16 px-10 shadow-2xl lg:mt-12 lg:rounded-3xl">
				<Header />
			</header>

			<main className="mx-16">
				<section className="mx-8 mt-16 mb-8">
					<div className="mt-6 ">
						<h3 className="pb-4 text-md font-semibold text-gray-900">Browse</h3>
						<div className="flex"></div>
					</div>
					<div className="flex">
						<div className="flex flex-grow basis-full py-2 border rounded-md bg-white shadow-lg">
							<span className="px-2">🔎</span>
							<input
								className="focus:outline-none w-full"
								placeholder="Search"
							/>
						</div>
						<div className="flex items-center justify-center flex-grow ml-2 px-2 bg-white rounded-md border shadow-lg cursor-pointer">
							Menu
						</div>
					</div>
				</section>

				<ContentLayout title="TRENDING NOW">
					<Hydrate state={dehydratedState}>
						<Browse />
					</Hydrate>
				</ContentLayout>

				<ContentLayout title="POPULAR ANIME">
					<Hydrate state={dehydratedState}>
						<PopularAnime />
					</Hydrate>
				</ContentLayout>

				<ContentLayout title="TOP 100 ANIME">
					<Hydrate state={dehydratedState}>
						<TopAnimeList />
					</Hydrate>
				</ContentLayout>
			</main>
		</div>
	);
}
