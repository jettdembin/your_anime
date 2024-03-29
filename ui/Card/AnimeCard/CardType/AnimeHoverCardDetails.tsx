"use client";

import { useRef } from "react";

import { Media } from "@/types/anime";

import { convertTimeUntilAiring, getEmoji } from "@/util";

import useCardType from "@/hooks/useCardType";
import useClickOutside from "@/hooks/useClickOutside";

import AnimeHoverCardDetailsWrapper from "@/ui/Card/AnimeCard/CardType/AnimeHoverCardDetails/AnimeHoverCardDetailsWrapper";

type Props = {
  isVisible: boolean;
  animeDetails: Media | null;
  isLastCard: boolean | undefined;
  handleMouseLeave: () => void;
};

export default function AnimeHoverCardDetails({
  isVisible,
  animeDetails,
  isLastCard,
  handleMouseLeave,
}: Props) {
  const { cardType } = useCardType();
  const hoverCardRef = useRef<HTMLDivElement>(null);
  useClickOutside(hoverCardRef, () => {
    handleMouseLeave();
  });

  const nextEpisodeDays = animeDetails?.nextAiringEpisode
    ? Math.floor(animeDetails.nextAiringEpisode.timeUntilAiring / 86400)
    : null;
  const currentEpisode =
    animeDetails?.nextAiringEpisode?.episode &&
    animeDetails.nextAiringEpisode.episode > 1
      ? animeDetails.nextAiringEpisode.episode - 1
      : null;
  const hoursUntilNextEpisode =
    animeDetails?.nextAiringEpisode?.timeUntilAiring;

  const studioName = animeDetails?.studios?.nodes[0]?.name || "Unknown";
  const likedPercentage = animeDetails?.averageScore;

  const {
    episodes,
    startDate,
    description,
    genres = [],
    status,
    season,
    seasonYear,
    trailer,
    title,
  } = animeDetails || {};
  // debugger  console.log("mounted anime hover card");

  const currentlyAiring = (
    <h6 className="text-lg text-gray-800">
      Ep {!!currentEpisode ? currentEpisode + 1 : null} airing in
      {nextEpisodeDays
        ? ` ${nextEpisodeDays} days`
        : ` ${
            !!hoursUntilNextEpisode &&
            convertTimeUntilAiring(hoursUntilNextEpisode)
          } hours`}
    </h6>
  );

  const airedPreviously = (
    <h6 className="text-xs">
      {episodes ? `${episodes} episodes aired in ` : "Ongoing"}
      {!!season && season?.split("")[0] + season?.slice(1).toLowerCase()}
    </h6>
  );

  return (
    <AnimeHoverCardDetailsWrapper isLastCard={isLastCard} isVisible={isVisible}>
      <div className="flex flex-col" ref={hoverCardRef}>
        <div className="w-full flex justify-between font-medium">
          {status === "FINISHED" ? (
            <>
              <div className="w-full flex items-center justify-between font-medium">
                <div className="text-lg flex gap-1 text-gray-700">
                  <h6>
                    {!!animeDetails?.season &&
                      animeDetails?.season?.split("")[0] +
                        animeDetails?.season?.slice(1).toLowerCase()}
                  </h6>{" "}
                  <h6>{`${animeDetails?.seasonYear}`}</h6>
                </div>
                <div>
                  {getEmoji(likedPercentage)} {likedPercentage}%
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-3/4">
                {!!nextEpisodeDays ? currentlyAiring : airedPreviously}
              </div>
              <span>
                {getEmoji(likedPercentage)} {likedPercentage}%
              </span>
            </>
          )}
        </div>
      </div>
      <div className="w-full pt-4 pb-6">
        <h6 className="text-xs text-gray-800 font-semibold">{studioName}</h6>
        <div className="w-full flex gap-2 text-gray-800">
          <p className="text-xs">TV SHOW</p>
          <span
            className="material-icons pt-1 grid place-items-center text-gray-800"
            style={{ fontSize: "7px" }}
          >
            fiber_manual_record
          </span>
          <p className="text-xs">{animeDetails?.episodes} episodes</p>
        </div>
      </div>
      <div className="w-full  flex flex-wrap gap-2">
        {!!animeDetails &&
          animeDetails?.genres?.slice(0, 3).map((genre: any, i: number) => (
            <p
              className="text-xs bg-yellow-300 rounded-3xl px-2 py-1"
              key={genre + i + cardType}
            >
              {genre?.toLowerCase()}
            </p>
          ))}
      </div>
    </AnimeHoverCardDetailsWrapper>
  );
}
