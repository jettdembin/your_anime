"use client";

import { useState, useRef } from "react";

import YouTube from "react-youtube";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Media } from "@/src/types/anime";

import { getEmoji, convertTimeUntilAiring } from "@/src/util";

interface AnimeCardProps {
	media: Media;
	isLastCard: boolean;
	isCardHovered: boolean;
	setIsCardHovered: (isCardHovered: boolean) => void;
}

const AnimeDetailsLarge = ({
	media,
	isCardHovered,
	setIsCardHovered,
}: AnimeCardProps) => {
	const convertTimeUntilAiring = (hours: number): string => {
		// Convert hours to days
		const days = Math.floor(hours / 24);
		const remainingHours = hours % 24;

		return `${days} days ${remainingHours} hours`;
	};

	const {
		description,
		genres = [],
		status,
		season,
		seasonYear,
		trailer,
	} = media;

	const MAX_DESCRIPTION_LENGTH = 100;

	// Get the truncated description
	const truncatedDescription =
		description?.length > MAX_DESCRIPTION_LENGTH
			? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
			: description;

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

	const [isExpanded, setIsExpanded] = useState(false);
	const [thumbnailBounds, setThumbnailBounds] = useState(null);
	const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);
	const thumbnailRef = useRef(null);

	const handleBackdropClick = () => {
		setIsExpanded(false);
		setIsCardHovered(false);
	};
	const handleTrailerClick = () => {
		if (thumbnailRef.current === null) return;
		setThumbnailBounds(thumbnailRef.current.getBoundingClientRect());
		setIsExpanded(true);

		if (!isThumbnailVisible) setIsThumbnailVisible(true);

		// Hide the thumbnail after animation is complete
		setTimeout(() => {
			setIsThumbnailVisible(false);
		}, 500); // match the duration of the animation
	};

	return (
		<AnimatePresence>
			<div className="hidden xl:flex absolute flex-col left-[14.3rem] top-0  w-[25.2rem] h-72">
				<div
					className={`m-4 h-60 ${
						isCardHovered
							? "overflow-y-scroll overflow-x-hidden"
							: "overflow-hidden"
					}`}
				>
					{/* <div className="flex flex-col flex-wr">
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
					</div> */}
					<motion.div
						role="button"
						onClick={handleTrailerClick}
						className="w-[200%] grid grid-cols-2"
						animate={{
							x: isCardHovered ? "-50%" : "0%",
						}}
						transition={{ duration: 0.3, delay: 0.2, type: "tween" }}
					>
						<div className="w-full flex  justify-between font-medium">
							<div className="text-lg flex  gap-1 text-gray-700">
								<h6>{season?.split("")[0] + season?.slice(1).toLowerCase()}</h6>{" "}
								<h6>{`${seasonYear}`}</h6>
							</div>
							<div>
								{getEmoji(likedPercentage)} {likedPercentage}%
							</div>
						</div>
						{!!id && site === "youtube" && (
							<>
								{!!thumbnail && (
									<div>
										<Image
											ref={thumbnailRef}
											src={thumbnail}
											alt="Trailer Thumbnail"
											width={100}
											height={50}
										/>
									</div>
								)}
							</>
						)}
					</motion.div>
					<div
						dangerouslySetInnerHTML={
							!isCardHovered
								? { __html: truncatedDescription + "..." }
								: { __html: description }
						}
					></div>
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
			{isExpanded && (
				<AnimatePresence>
					<motion.div
						initial={{
							top: thumbnailBounds?.top || "0",
							left: thumbnailBounds?.left || "0",
							width: thumbnailBounds?.width || "0",
							height: thumbnailBounds?.height || "0",
						}}
						animate={{
							top: "50%",
							left: "50%",
							width: "40%",
							height: "20%",
							x: "-50%",
							y: "-50%",
						}}
						exit={{
							top: thumbnailBounds?.top || "0",
							left: thumbnailBounds?.left || "0",
							width: thumbnailBounds?.width || "0",
							height: thumbnailBounds?.height || "0",
						}}
						transition={{ duration: 0.5 }}
						className="fixed z-50"
						// style={{
						// 	position: "fixed",
						// 	zIndex: 100,
						// 	borderRadius: "5px",
						// }}
					>
						<Image
							className={isThumbnailVisible ? "block" : "hidden"}
							src={thumbnail}
							alt="Trailer Thumbnail"
							layout="fill"
							objectFit="cover"
						/>
					</motion.div>
				</AnimatePresence>
			)}
			{isExpanded && (
				<div
					className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-hidden"
					onClick={handleBackdropClick}
				>
					<motion.section
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 1, delay: 0.5 }}
						className="relative aspect-w-16 aspect-h-9 max-w-screen-xl"
					>
						<YouTube
							videoId={id}
							opts={{
								playerVars: {
									autoplay: 1,
									controls: 1,
									modestbranding: 1,
								},
							}}
						/>
					</motion.section>
				</div>
			)}
		</AnimatePresence>
	);
};

export default AnimeDetailsLarge;
