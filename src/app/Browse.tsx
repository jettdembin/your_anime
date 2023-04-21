"use client";

import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";

const ANILIST_API_ENDPOINT = "https://graphql.anilist.co";

export default function Browse({ media }) {
	const [trending, setTrending] = useState(media);
	const [loading, setLoading] = useState(false);

	const [animeBrowseFilter, setAnimeBrowseFilter] = useState("Anime");
	const [isBrowseAnimeOpen, setIsBrowseAnimeOpen] = useState(false);

	const getTrending = () => {
		return axios.post(ANILIST_API_ENDPOINT, {
			query: `
      query {
        Trending: Page {
          media (type: ${animeBrowseFilter.toUpperCase()}, sort: POPULARITY_DESC) {
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
	};

	const CHARACTERS_QUERY = `
	query {
		characters(page: 1, perPage: 50) {
			edges {
			node {
				id
				name {
				first
				last
				}
				description
				image {
				large
				}
			}
			}
		}
	}
	`;

	const browseAnimeRef = useRef(null);

	return (
		<main className="px-6 py-6">
			<div className="flex gap-8 pt-12">
				<h2 className="text-3xl">Browse</h2>
				<div className="relative">
					<h2
						className="text-3xl cursor-pointer"
						onClick={() => {
							setIsBrowseAnimeOpen(!isBrowseAnimeOpen);
							// debugger;
							console.log("clicked");
							console.log(isBrowseAnimeOpen);
						}}
					>
						{animeBrowseFilter} ⬇
					</h2>
					{!!isBrowseAnimeOpen && (
						<ul
							className="rounded-md shadow-md  pl-2 pr-4 py-2 mt-2 cursor-pointer bg-white absolute transition-all"
							onClick={(e: any) => {
								setAnimeBrowseFilter(e.target.innerText);
								console.log(e.target.innerText);
							}}
							ref={browseAnimeRef}
						>
							<li>
								<h2 className="text-xl">Anime</h2>
							</li>
							<li>
								<h2 className="text-xl">Manga</h2>
							</li>
							<li>
								<h2 className="text-xl">Characters</h2>
							</li>
							<li>
								<h2 className="text-xl">Staff</h2>
							</li>
							<li>
								<h2 className="text-xl">Studios</h2>
							</li>
							<li>
								<h2 className="text-xl">Users</h2>
							</li>
						</ul>
					)}
				</div>
			</div>
			<div className="flex py-12">
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
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
					{trending?.map((media) => (
						<div className="flex overflow-y-scroll overflow-x-hidden">
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
									<Image
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
				</div>
			)}
		</main>
	);
}
