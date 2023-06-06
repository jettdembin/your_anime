"use client";
import React, { useEffect, useState } from "react";

interface AnimeDetailsProps {
	isVisible: boolean;
	nextEpisodeDays: number | null;
	likedPercentage: number;
	studioName: string;
	currentEpisode: number | null;
	totalEpisodes: number | null;
	genres: string[];
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	isVisible,
	nextEpisodeDays,
	likedPercentage,
	studioName,
	currentEpisode,
	totalEpisodes,
	genres,
	isLastCard,
}) => {
	const completedAnime = (
		<>
			<p>Total Episodes: {totalEpisodes || "Unknown"}</p>
			<p>Genres: {genres.join(", ")}</p>
			<p className="text-right">{likedPercentage}% liked</p>
			<p>Studio: {studioName}</p>
		</>
	);

	return (
		<div
			className={`absolute ${
				isLastCard ? "right-full" : "left-full"
			} top-1/4 ml-4 w-64 p-4 bg-white text-gray-900 shadow-md rounded-lg z-10 ease-in opacity-0 ${
				isVisible && "animate-appearing-card"
			}`}
		>
			{nextEpisodeDays ? (
				<>
					<p>Next episode in {nextEpisodeDays} days</p>
					<p>Current Episode: {currentEpisode || "Unknown"}</p>
					<p>Total Episodes: {totalEpisodes || "Unknown"}</p>
					<p>Genres: {genres.join(", ")}</p>
					<p className="text-right">{likedPercentage}% liked</p>
					<p>Studio: {studioName}</p>
				</>
			) : (
				<>
					<p>Next episode in {nextEpisodeDays} days</p>
				</>
			)}
			{nextEpisodeDays ? (
				<p>Next episode in {nextEpisodeDays} days</p>
			) : (
				<p>Completed</p>
			)}
			<p>Current Episode: {currentEpisode || "Unknown"}</p>
			<p>Total Episodes: {totalEpisodes || "Unknown"}</p>
			<p>Genres: {genres.join(", ")}</p>
			<p className="text-right">{likedPercentage}% liked</p>
			<p>Studio: {studioName}</p>
		</div>
	);
};

export default AnimeDetails;
