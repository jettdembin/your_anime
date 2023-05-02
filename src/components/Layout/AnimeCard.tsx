"use client";

import { Anime } from "../../util/models";

export default function AnimeCard({ media }) {
	return (
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
	);
}
