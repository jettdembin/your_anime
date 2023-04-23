"use client";
import React, { useEffect, useState } from "react";

interface AnimeDetailsProps {
	isVisible: boolean;
	nextEpisodeDays: number;
	likedPercentage: number;
	studioName: string;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	isVisible,
	nextEpisodeDays,
	likedPercentage,
	studioName,
}) => {
	return (
		<div
			className={`absolute left-full top-1/4 ml-4 w-64 p-4 bg-white text-gray-900 shadow-md rounded-sm z-10 ease-in opacity-0 ${
				isVisible && "animate-appearing-card"
			}`}
		>
			<div className="absolute -left-2 top-4 w-0 h-0 border-4 border-transparent border-r-white"></div>
			<p>Next episode in {nextEpisodeDays} days</p>
			<p className="text-right">{likedPercentage}% liked</p>
			<p>Studio: {studioName}</p>
		</div>
	);
};

export default AnimeDetails;
