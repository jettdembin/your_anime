"use client";

import { useState } from "react";

import { Media } from "@/types/anime";

import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

import ListType from "@/components/ui/AnimeCard/ListType";
import CardType from "@/components/ui/AnimeCard/CardType";
import DescriptiveType from "@/components/ui/AnimeCard/DescriptiveType";
import { useCardTypeContext } from "@/components/Pages/Discover/context/CardTypeContext";

interface AnimeCardProps {
  media: Media;
  isLastCard?: boolean;
}

export default function AnimeCard({
  media,
  isLastCard,
  index,
}: AnimeCardProps) {
  const { cardType } = useCardTypeContext();

  const [isCardHovered, setIsCardHovered] = useState(false);

  let card;

  if (cardType === "card") {
    card = <CardType media={media} />;
  }

  if (cardType === "descriptive") {
    card = <DescriptiveType media={media} isCardHovered={isCardHovered} />;
  }

  if (cardType === "list") {
    card = <ListType anime={media} index={index} />;
  }

  // const card = (
  //   <>
  //     <CardType
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
  //     <ListType
  //       media={media}
  //       isCardHovered={isCardHovered}
  //       setIsCardHovered={setIsCardHovered}
  //     />
  //   </>
  // );

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* {cardType === "list" ? <ListCard anime={media} index={index} /> : card} */}
      {card}
    </div>
  );
}
