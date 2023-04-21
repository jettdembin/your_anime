import React from "react";
import Image from "next/image";

import { Anime } from "../utils/models";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const AnimeCard = ({ id, handleAddToFavorites, search, attributes }: Anime) => {
	const API_URL: string = "https://kitsu.io/api/edge";

	const { isLoading, error, data } = useQuery(search, () =>
		fetch(`${API_URL}/anime?filter[text]=${search}`)
			.then((res) => res.json())
			.then((res) => console.log(res))
	);

	if (error) return "An error has occurred: " + error.message;

	return (
		<div
			className="border bg-green-50 rounded-md shadow-md p-4"
			style={{ minHeight: "100%" }}
		>
			<h1>{attributes.canonicalTitle}</h1>
			{/* <Image
        width={200}
        height={200}
        src={data.posterImage.tiny}
        alt={`${data.canonicalTitle} image`}
        role="presentation"
      /> */}
			{isLoading ? (
				<div>
					<h1>loading</h1>
				</div>
			) : (
				<figure
					className="grid grid-cols-2 loader-cntr"
					style={{ minHeight: "100%" }}
				>
					<Image
						width={200}
						height={100}
						src={attributes.posterImage?.medium}
						alt={`${attributes.canonicalTitle} image`}
						role="presentation"
					/>
					<div className="flex flex-col border border-black p-2">
						<p>
							<b>Rank:</b> {attributes.popularityRank}{" "}
							{attributes.popularityRank < 100 && "😍"}
						</p>
						<p>Start: {attributes.startDate}</p>
						<p>End: {attributes.endDate ?? "Airing"}</p>
						<button
							className="mt-auto border bg-green-400 rounded-sm border-none p-1 text-white"
							onClick={() => {
								handleAddToFavorites(attributes);
							}}
						>
							Add to Favorites ⭐
						</button>
					</div>
				</figure>
			)}
		</div>
	);
};

export default AnimeCard;
