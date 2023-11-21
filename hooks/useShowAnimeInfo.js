import { useState } from "react";

export const useShowAnimeInfo = () => {
	const [hoveredAnime, setHoveredAnime] = useState();

	const handleMouseEnter = (animeId) => {
		setHoveredAnime(animeId);
		console.log(animeId);
	};

	const handleMouseLeave = () => {
		// debugger;
		setHoveredAnime(null);
	};

	return {
		hoveredAnime,
		handleMouseEnter,
		handleMouseLeave,
	};
};
