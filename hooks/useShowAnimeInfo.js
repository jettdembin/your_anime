import { useState } from "react";

export const useShowAnimeInfo = () => {
  const [hoveredAnime, setHoveredAnime] = useState();

  const handleMouseEnter = (animeId) => {
    setHoveredAnime(animeId);
  };

  const handleMouseLeave = () => {
    setHoveredAnime(null);
  };

  return {
    hoveredAnime,
    handleMouseEnter,
    handleMouseLeave,
  };
};
