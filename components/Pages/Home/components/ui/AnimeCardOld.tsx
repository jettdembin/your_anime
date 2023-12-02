"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Media } from "@/types/anime";

import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";
import { useCardTypeContext } from "@/components/Pages/Discover/context/CardTypeContext";

import CardTypeOld from "./AnimeCard/CardTypeOld";
import ListTypeOld from "./AnimeCard/ListTypeOld";

import AnimeDetails from "@/components/Pages/Home/components/ui/AnimeCard/AnimeDetails";
import AnimeCardLong from "./ListType";

interface AnimeCardProps {
  media: Media;
  isLastCard?: boolean;
}

export default function AnimeCard({ media, isLastCard }: AnimeCardProps) {
  const router = useRouter();
  const { cardType } = useCardTypeContext();
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
    useShowAnimeInfo();

  const nextEpisodeDays = media?.nextAiringEpisode
    ? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
    : null;

  const card = (
    <>
      <CardTypeOld
        media={media}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      {hoveredAnime === media.id && (
        <div
          className={`xl:hidden absolute top-0 ${
            !!isLastCard ? "-left-4 left-triangle" : "right-0 right-triangle"
          }`}
        >
          <AnimeDetails
            isVisible={hoveredAnime === media.id}
            animeDetails={media}
            isLastCard={isLastCard}
            nextEpisodeDays={nextEpisodeDays}
          />
        </div>
      )}
      {/* Content div related to the image */}
      <ListTypeOld
        media={media}
        isCardHovered={isCardHovered}
        setIsCardHovered={setIsCardHovered}
      />
    </>
  );

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      onClick={() => {
        router.push(`/anime-details/${media.title.english}`);
        debugger;
      }}
    >
      {cardType === "list" ? <ListCard anime={media} /> : card}
    </div>
  );
}
