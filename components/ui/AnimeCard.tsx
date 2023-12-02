"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Media } from "@/types/anime";

import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

import ListType from "@/components/ui/AnimeCard/ListType";
import CardType from "@/components/ui/AnimeCard/CardType";
import CardTypeOld from "@/components/Pages/Home/components/ui/AnimeCard/CardTypeOld";
import ListTypeOld from "@/components/Pages/Home/components/ui/AnimeCard/CardTypeOld";
import DescriptiveType from "@/components/ui/AnimeCard/CardType";
import { useCardTypeContext } from "@/components/Pages/Discover/context/CardTypeContext";
import AnimeDetails from "../Pages/Home/components/ui/AnimeCard/AnimeDetails";

type CardType = "card" | "descriptive" | "list";

interface AnimeCardProps {
  media: Media;
  isLastCard?: boolean;
  index: number;
  type?: CardType;
}

export default function AnimeCard({
  media,
  isLastCard,
  index,
}: AnimeCardProps) {
  const { cardType } = useCardTypeContext();

  const [isCardHovered, setIsCardHovered] = useState(false);
  const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
    useShowAnimeInfo();

  const nextEpisodeDays = media?.nextAiringEpisode
    ? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
    : null;

  let card;

  if (cardType === "card") {
    card = <CardType media={media} isLastCard={isLastCard} index={index} />;
  }

  if (cardType === "descriptive") {
    card = <DescriptiveType media={media} isCardHovered={isCardHovered} />;
    // card = (
    //   <>
    //     <CardTypeOld
    //       media={media}
    //       handleMouseEnter={handleMouseEnter}
    //       handleMouseLeave={handleMouseLeave}
    //     />
    //     {hoveredAnime === media.id && (
    //       <div
    //         className={`xl:hidden absolute top-0 ${
    //           !!isLastCard ? "-left-4 left-triangle" : "right-0 right-triangle"
    //         }`}
    //       >
    //         <AnimeDetails
    //           isVisible={hoveredAnime === media.id}
    //           animeDetails={media}
    //           isLastCard={isLastCard}
    //           nextEpisodeDays={nextEpisodeDays}
    //         />
    //       </div>
    //     )}
    //     {/* Content div related to the image */}
    //     <ListTypeOld
    //       media={media}
    //       isCardHovered={isCardHovered}
    //       setIsCardHovered={setIsCardHovered}
    //     />
    //   </>
    // );
  }

  if (cardType === "list") {
    card = <ListType anime={media} index={index} />;
  }

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {card}
    </div>
  );
}
