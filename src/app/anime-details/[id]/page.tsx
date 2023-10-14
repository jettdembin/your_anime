"use client";

import { GET_ANIME_DETAILS, useAnimeDetails } from "@/src/graphql/queries";

const AnimeDetails = ({ params }: { params: { id: string } }) => {
	const { error, loading, data } = useAnimeDetails(params.id);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const anime = data.Media;

	// Define the Hero component
	const hero = (
		<div className="flex p-4 bg-gray-100">
			<img
				className="w-1/4 h-auto"
				src={anime.coverImage.large}
				alt={anime.title.english}
			/>
			<div className="ml-4">
				<h2 className="text-3xl mb-2">{anime.title.english}</h2>
				<p className="text-gray-700">{anime.description}</p>
			</div>
		</div>
	);

	return (
		<div>
			<header className="bg-gray-800 p-4 text-white">
				<h1 className="text-2xl">{anime.title.english}</h1>
			</header>
			<main>{hero}</main>
		</div>
	);
};

export default AnimeDetails;
