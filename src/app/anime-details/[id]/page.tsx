"use client";

import { GET_ANIME_DETAILS, useAnimeDetails } from "@/src/graphql/queries";

const AnimeDetails = ({ params }: { params: { id: string } }) => {
	const { error, loading, data } = useAnimeDetails(params.id);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const anime = data.Media;

	// Define the Hero component
	const hero = (
		<div className="flex flex-col bg-gray-100">
			<img
				className="w-full max-h-[1000px] h-96 object-cover rounded-md"
				src={anime.bannerImage}
				// src={anime.coverImage.extraLarge}
				alt={anime.title.english}
			/>
			<div
				className="grid relative p-8"
				style={{ gridTemplateColumns: "2fr 3fr" }}
			>
				<div className="relative -top-2/4 translate-y-1/4 w-full max-w-fit">
					<div className="flex flex-col space-y-4">
						{/* <div className="relative -top-2/4 translate-y-1/4 max-h-[25rem] w-full overflow-hidden max-w-fit"> */}
						<img
							className="w-72 object-cover rounded-md"
							src={anime.coverImage.extraLarge}
							alt={anime.title.english}
						/>

						<div className="flex gap-2 relative top-0">
							<button className="w-40 py-1 bg-blue-200">Add to List</button>
							<button className="w-12 py-1 bg-red-400">♥</button>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-3xl mb-2">{anime.title.english}</h2>
					<p className="text-gray-700">{anime.description}</p>
				</div>
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
