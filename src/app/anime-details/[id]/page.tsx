"use client";

import { useRef, useEffect } from "react";

import { GET_ANIME_DETAILS, useAnimeDetails } from "@/src/graphql/queries";

const AnimeDetails = ({ params }: { params: { id: string } }) => {
	const animeDescriptionRef = useRef(null);

	const { error, loading, data } = useAnimeDetails(params.id);
	const anime = data?.Media;

	useEffect(() => {
		if (data && !!animeDescriptionRef?.current) {
			animeDescriptionRef.current.innerHTML = anime.description;
		}
	}, [data?.Media, anime?.description, data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	// Define the Hero component
	const hero = (
		<div className="header-wrap relative bg-slate-50">
			<div
				className="banner w-full h-[400px] -mt-12 relative"
				style={{
					background: `url(${anime.bannerImage})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50% 35%",
				}}
			>
				<div
					className="absolute inset-0 bg-opacity-50 bg-black shadow-inner"
					style={{
						background:
							"linear-gradient(180deg,rgba(10, 10, 10, 0) 40%,rgba(10, 10, 10, 0.6))",
					}}
				></div>
			</div>
			<div className="header">
				<div
					className="container grid gap-7 max-w-6xl px-7"
					style={{ gridTemplateColumns: "215px auto" }}
				>
					<div className="relative -mt-32">
						<div className="static shadow-lg">
							<img
								className="w-full object-cover rounded-sm"
								src={anime.coverImage.extraLarge}
								alt={anime.title.english}
							/>
						</div>
						<div
							className="grid my-5 gap-4"
							style={{ gridTemplateColumns: "auto 35px" }}
						>
							<button className="py-2 bg-blue-200 rounded-sm">
								Add to List
							</button>
							<button className="py-2 bg-red-400 rounded-sm text-white">
								♥
							</button>
						</div>
					</div>

					<div className="pl-4 pt-6 pb-4">
						<h2 className="text-3xl mb-2">{anime.title.english}</h2>
						<p className="text-gray-700" ref={animeDescriptionRef}></p>
					</div>
				</div>
			</div>
		</div>
	);

	const animeRating = (
		<div className="px-8 mb-4">
			<div className="w-[225px] bg-white shadow-sm p-4">
				<h6>⭐ Highest Rated All Time</h6>
			</div>
		</div>
	);

	const animePopularity = (
		<div className="px-8 mb-4">
			<div className="w-[225px] bg-white shadow-sm p-4">
				<h6>💖 Most Popular All Time</h6>
			</div>
		</div>
	);

	const animeInfo = (
		<div className="px-8">
			<ul className="w-[225px] flex flex-col space-y-4 rounded-md bg-white shadow-sm p-4">
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
				<li>
					<h6>Format</h6>
					<p className="text-sm text-slate-700">Tv</p>
				</li>
			</ul>
		</div>
	);

	return (
		<div>
			<main>
				<section>{hero}</section>
				<section className="py-4">
					{animeRating}
					{animePopularity}
					{animeInfo}
				</section>
			</main>
		</div>
	);
};

export default AnimeDetails;
