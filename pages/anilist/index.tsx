import Image from "next/image";

import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import useClickOutside from "../../hooks/useClickOutside";

const TRENDING_URL = "https://graphql.anilist.co";

const getTrending = () => {
  return axios.post(TRENDING_URL, {
    query: `
      query {
        Trending: Page {
          media (type: ANIME, sort: POPULARITY_DESC) {
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

const AniList = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const [animeBrowseFilter, setAnimeBrowseFilter] = useState("Anime");
  const [isBrowseAnimeOpen, setIsBrowseAnimeOpen] = useState(false);

  useEffect((): any => {
    let ignore = false;
    if (ignore) return;

    const fetchData = async () => {
      const res = await getTrending();
      setTrending(res.data.data.Trending.media);
      console.log(res);
      setLoading(false);
    };

    fetchData();
    console.log(trending);
    return () => (ignore = true);
  }, []);

  const browseAnimeRef = useRef(null);

  useClickOutside(browseAnimeRef, () => {
    if (isBrowseAnimeOpen) setIsBrowseAnimeOpen(false);
  });

  return (
		<div className="">
			<nav className="h-16 px-6 bg-gray-800 flex items-center justify-center md:hidden">
				<ul className="mx-auto flex gap-96 text-gray-100">
					<li className="my-auto font-medium">AL</li>
					<li className="my-auto font-medium">Search</li>
					<div className="flex gap-4">
						<li className="my-auto font-medium">Login</li>
						<li>
							<button className="rounded-md bg-emerald-500 text-white px-3 py-1 font-medium">
								Sign Up
							</button>
						</li>
					</div>
				</ul>
			</nav>
			<header className="relative bg-gray-800 px-20 py-16 max-w-6xl shadow-2xl lg:mx-10 lgmy-12 lg:rounded-3xl">
				<h1 className="text-3xl font-bold text-gray-100 mb-10 mx-auto max-w-full text-center">
					The next generation anime platform
				</h1>
				<h2 className="max-w-full text-xl text-center text-emerald-200">
					Track, share, and discover your favorite anime and manga with
					YourAnime????
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
								Discover your obsessions<span className="ml-2">????</span>
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
								Bring YourAnime anywhere <span className="ml-2">????</span>
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
								Join the conversation <span className="ml-2"> ????</span>
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
							src="	https://anilist.co/img/landing/custom.svg"
							alt="pic"
							role="presentation"
						/>
						<div>
							<h3 className="text-lg font-semibold text-gray-100">
								Tweak it to your liking <span className="ml-2">????</span>
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
						Join ???
					</button>
				</div>
			</header>
			<main className="px-6 py-6">
				<div className="flex gap-8 pt-12">
					<h2 className="text-3xl">Browse</h2>
					<div className="relative">
						<h2
							className="text-3xl cursor-pointer"
							onClick={() => setIsBrowseAnimeOpen(!isBrowseAnimeOpen)}
						>
							{animeBrowseFilter} ???
						</h2>
						{isBrowseAnimeOpen && (
							<ul
								className="rounded-md shadow-md px-2 py-2 mt-2 cursor-pointer bg-white absolute transition-all"
								onClick={(e: any) => {
									setAnimeBrowseFilter(e.target.innerText);
									console.log(e.target.innerText);
								}}
								ref={browseAnimeRef}
							>
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
					<div className="flex flex-grow basis-full py-2 border rounded rounded-md bg-white shadow-lg">
						<div>
							<span className="px-2">????</span>
							<input placeholder="Search" />
						</div>
					</div>
					<div className="flex items-center justify-center flex-grow ml-2 px-2 bg-white rounded-md border shadow-lg">
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
					<div className="grid grid-cols-4 gap-4">
						{trending.map((media) => (
							<a
								href={`/anime/${media.id}`}
								key={media.id}
								className="group rounded-lg shadow-lg overflow-hidden transition duration-500 hover:scale-105"
							>
								<Image
									width={220}
									height={150}
									src={media.coverImage.large}
									alt={media.title.romaji}
								/>
								<div className="px-6">
									<div className="font-bold text-xl mb-2 text-gray-100">
										{media.title.romaji}
									</div>
									<p className="text-gray-500 text-base">
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
							</a>
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export default AniList;
