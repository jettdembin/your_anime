"use client";

import { useState } from "react";

import { Media } from "@/types/anime";

import { useCardTypeContext } from "@/context/CardTypeContext";

import CardType from "@/ui/Card/AnimeCard/CardType";
import DescriptiveType from "@/ui/Card/AnimeCard/DescriptiveTypeRefactored";
// import DescriptiveType from "@/ui/Card/AnimeCard/DescriptiveType";
import ListType from "@/ui/Card/AnimeCard/ListType";

type CardType = "card" | "descriptive" | "list";

interface AnimeCardProps {
  like?: {};
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
  const columns = cardType === "card" ? 4 : cardType === "descriptive" ? 2 : 1;
  const isLastIndexOfRow = (index: number) => index % 3 == 0;

  const [isCardHovered, setIsCardHovered] = useState(false);

  const nextEpisodeDays = media?.nextAiringEpisode
    ? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
    : null;

  let card;

  if (cardType === "card") {
    card = <CardType media={media} isLastCard={isLastCard} index={index} />;
  }

  if (cardType === "descriptive") {
    card = <DescriptiveType media={media} isCardHovered={isCardHovered} />;
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
