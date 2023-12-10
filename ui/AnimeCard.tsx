"use client";

import { useState } from "react";

import { Media } from "@/types/anime";

import { useCardTypeContext } from "@/context/CardTypeContext";

import ListType from "@/ui/AnimeCard/ListType";
import CardType from "@/ui/AnimeCard/CardType";
import DescriptiveType from "@/ui/AnimeCard/DescriptiveType";

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
