import Image from "next/image";

import Browse from "./Browse";

export const metadata = {
	title: "My Page Title",
};

import { gql } from "@apollo/client";
import client from "@/apollo-client";

export default async function Home() {
	const { data } = await client.query({
		query: gql`
			query {
				Trending: Page {
					media(type: ANIME, sort: POPULARITY_DESC) {
						id
						title {
							romaji
							english
							native
						}
						coverImage {
							large
						}
						format
						episodes
						status
						startDate {
							year
							month
							day
						}
						endDate {
							year
							month
							day
						}
						synonyms
						genres
						averageScore
						popularity
					}
				}
			}
		`,
	});

	return (
		<div className="">
			<nav className="h-20 px-8 bg-gray-800 lg:flex items-center justify-center hidden">
				<ul className="flex gap-60 text-gray-100">
					<li className="my-auto font-medium">AL</li>
					<div className="flex gap-10">
						<li className="my-auto font-medium cursor-pointer">Search</li>
						<li className="my-auto font-medium cursor-pointer">Social</li>
						<li className="my-auto font-medium cursor-pointer">Forum</li>
					</div>
					<div className="flex gap-4">
						<li className="my-auto font-medium cursor-pointer">Login</li>
						<li>
							<button className="rounded-md bg-emerald-500 text-white px-3 py-1 font-medium">
								Sign Up
							</button>
						</li>
					</div>
				</ul>
			</nav>
			<header className="mx-auto relative bg-gray-800 px-20 py-16 max-w-6xl shadow-2xl  lg:my-12 lg:rounded-3xl">
				<h1 className="text-3xl font-bold text-gray-100 mb-10 mx-auto max-w-full text-center">
					The next generation anime platform
				</h1>
				<h2 className="max-w-full text-xl text-center text-emerald-200">
					Track, share, and discover your favorite anime and manga with
					YourAnime😍
				</h2>
				<div className="grid grid-cols-2 mx-auto my-24 gap-y-20 gap-x-16">
					<div
						className="grid grid-cols-2"
						style={{
							display: "grid",
							gridTemplateColumns: "80px auto",
							gridGap: "40px",
						}}
					>
						<Image
							width={100}
							height={100}
							src="https://anilist.co/img/landing/stats.svg"
							alt="pic"
							role="presentation"
						/>
						<div>
							<h3 className="text-lg font-semibold text-gray-100">
								Discover your obsessions<span className="ml-2">🔎</span>
							</h3>
							<p className="text-md text-emerald-200">
								What are your highest rated genres or most watched voice actors?
								Follow your watching habits over time with in-depth statistics.
							</p>
						</div>
					</div>
					<div
						className="grid grid-cols-2"
						style={{
							display: "grid",
							gridTemplateColumns: "80px auto",
							gridGap: "40px",
						}}
					>
						<Image
							width={100}
							height={100}
							src="	https://anilist.co/img/landing/apps.svg"
							alt="pic"
							role="presentation"
						/>
						<div>
							<h3 className="text-lg font-semibold text-gray-100">
								Bring YourAnime anywhere <span className="ml-2">🌎</span>
							</h3>
							<p className="text-md text-emerald-200">
								What are your highest rated genres or most watched voice actors?
								Follow your watching habits over time with in-depth statistics.
							</p>
						</div>
					</div>
					<div
						className="grid grid-cols-2"
						style={{
							display: "grid",
							gridTemplateColumns: "80px auto",
							gridGap: "40px",
						}}
					>
						<Image
							width={100}
							height={100}
							src="https://anilist.co/img/landing/social.svg"
							alt="pic"
							role="presentation"
						/>
						<div>
							<h3 className="text-lg font-semibold text-gray-100">
								Join the conversation <span className="ml-2"> 📝</span>
							</h3>
							<p className="text-md text-emerald-200">
								What are your highest rated genres or most watched voice actors?
								Follow your watching habits over time with in-depth statistics.
							</p>
						</div>
					</div>
					<div
						className="grid grid-cols-2"
						style={{
							display: "grid",
							gridTemplateColumns: "80px auto",
							gridGap: "40px",
						}}
					>
						<Image
							width={100}
							height={100}
							src="https://anilist.co/img/landing/custom.svg"
							alt="pic"
							role="presentation"
						/>
						<div>
							<h3 className="text-lg font-semibold text-gray-100">
								Tweak it to your liking <span className="ml-2">💕</span>
							</h3>
							<p className="text-md text-emerald-200">
								What are your highest rated genres or most watched voice actors?
								Follow your watching habits over time with in-depth statistics.
							</p>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-1/2">
					<button className="bg-gray-50 rounded-lg px-4 py-2 mx-auto">
						Join ⏩
					</button>
				</div>
			</header>
			<Browse media={data.Trending.media} />
		</div>
	);
}
