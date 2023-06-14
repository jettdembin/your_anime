"use client";

import { useState } from "react";

import YouTube from "react-youtube";
import Image from "next/image";

import { Media } from "@/src/types/anime";

import { getEmoji, convertTimeUntilAiring } from "@/src/util";

interface AnimeCardProps {
	media: Media;
	// studioName: string;
	// nextEpisodeDays: number | null;
	isLastCard: boolean;
}

const AnimeDetailsLarge = ({ media }: AnimeCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const convertTimeUntilAiring = (hours: number): string => {
		// Convert hours to days
		const days = Math.floor(hours / 24);
		const remainingHours = hours % 24;

		return `${days} days ${remainingHours} hours`;
	};

	const { epsiodes, genres = [], status, season, seasonYear, trailer } = media;

	const { id, site, thumbnail } = trailer || {
		id: null,
		site: null,
		thumbnail: null,
	};

	const likedPercentage = media?.averageScore;

	const currentEpisode =
		media?.nextAiringEpisode?.episode && media.nextAiringEpisode.episode > 1
			? media.nextAiringEpisode.episode - 1
			: null;
	const hoursUntilNextEpisode = media?.nextAiringEpisode?.timeUntilAiring;

	const nextEpisodeDays = media?.nextAiringEpisode
		? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
		: null;
	const studioName = media?.studios?.nodes[0]?.name || "Unknown";

	console.log(thumbnail, "thumbnail");
	console.log(site, "site");
	console.log(id, "id");

	const [isExpanded, setIsExpanded] = useState(false);

	const handleTrailerClick = () => {
		setIsExpanded(true);
		console.log("clicked");
	};

	const handleBackdropClick = () => {
		setIsExpanded(false);
	};

	const trailerUrl = `https://www.youtube.com/watch?v=${id}`;

	return (
		<div className="hidden xl:flex absolute flex-col left-[14.3rem] top-0  w-[25.2rem] h-72">
			<div className="p-4">
				<div className="flex flex-col flex-wr">
					<div className="w-full flex justify-between font-medium">
						{status === "FINISHED" ? (
							<>
								<div className="w-full flex items-center justify-between font-medium">
									<div className="text-lg flex gap-1 text-gray-700">
										<h6>
											{season?.split("")[0] + season?.slice(1).toLowerCase()}
										</h6>{" "}
										<h6>{`${seasonYear}`}</h6>
									</div>
									<div>
										{getEmoji(likedPercentage)} {likedPercentage}%
									</div>
								</div>
							</>
						) : (
							<>
								<div className="w-3/4">
									<h6 className="text-lg text-gray-800">
										Ep {!!currentEpisode && currentEpisode + 1} airing in
										{nextEpisodeDays
											? ` ${nextEpisodeDays} days`
											: ` ${convertTimeUntilAiring(
													hoursUntilNextEpisode
											  )} hours`}
									</h6>
								</div>
								<span>
									{getEmoji(likedPercentage)} {likedPercentage}%
								</span>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="pl-4">
				{!!id && (
					<>
						<button onClick={handleTrailerClick}>Watch Trailer</button>
						{isExpanded && (
							<section
								className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-hidden"
								onClick={handleBackdropClick}
							>
								<div className="relative aspect-w-16 aspect-h-9 max-w-screen-xl">
									<YouTube videoId={id} />
								</div>
							</section>
						)}
					</>
				)}
			</div>
			<div className="px-4 py-2 flex justify-between mt-auto bg-genre">
				<div className="flex flex-wrap justify-between gap-2">
					{genres.slice(0, 4).map((genre: any, i: number) => (
						<span
							className="text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1"
							key={i}
						>
							{genre?.toLowerCase()}
						</span>
					))}
				</div>
				<span className="material-icons cursor-pointer text-blue-100">
					loupe
				</span>
			</div>
		</div>
	);
};

export default AnimeDetailsLarge;
