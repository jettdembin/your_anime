"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Media } from "@/types/anime";

import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

import AnimeHoverCardDetails from "@/ui/Card/AnimeCard/CardType/AnimeHoverCardDetails";
import Image from "next/image";

type Props = {
  media: Media;
  isLastCard?: boolean;
  index?: number;
};

interface LongPressComponentProps {
  onLongPress: () => void;
  duration?: number;
}

const CardType = ({ media, isLastCard, index }: Props) => {
  const router = useRouter();
  const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
    useShowAnimeInfo();

  const [pressing, setPressing] = useState<boolean>(false);
  const onLongPress = (): void => {
    handleMouseEnter(media.id);
  };

  useEffect(() => {
    let duration = 100;

    if (pressing && hoveredAnime) {
      // Start a timer when the user starts pressing
      setTimeout(onLongPress, duration);
    }
  }, [pressing, onLongPress]);

  const handleTouchStart = (): void => {
    setPressing(true); // User starts pressing
  };

  const handleTouchEnd = (): void => {
    setPressing(false); // User stops pressing
  };

  const studioName = media?.studios?.nodes[0]?.name || "Unknown";

  return (
    <>
      <div
        className="relative w-full h-72 xl:h-80 max-h-[230px] lg:max-h-[230px] xl:max-h-[250px] bg-gray-700 md:rounded-md overflow-hidden group"
        onMouseEnter={() => handleMouseEnter(media.id)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          router.push(`/anime-details/${media.id}`);
        }}
      >
        <div className="relative">
          <div className="overflow-hidden max-h-[230px] md:max-h-[290px]">
            <div className="relative w-full h-full">
              <Image
                width={250}
                height={250}
                style={{
                  objectFit: "cover",
                }}
                src={media.coverImage.extraLarge || ""}
                alt={media.title.english || media.title.native || ""}
                className="w-full transition duration-300 ease-in-out transform scale-100 md:scale-105 group-hover:scale-110 mt-[-20%] md:mt-[-15%]"
              />
            </div>
          </div>
        </div>
        {/* Title on screens up to large */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
        <div className="absolute bottom-0 left-0 w-full p-2 text-white transition-all duration-300 ease-in-out group-hover:bottom-2 z-10">
          {/* Background div */}
          <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-70 z-0"></div>

          {/* Title text */}
          <h3 className="text-sm font-semibold lg:text-base relative z-10">
            {media.title.english || media.title.native}
          </h3>
        </div>
      </div>
      {hoveredAnime === media.id && (
        <div
          className={`absolute top-0 ${
            !!isLastCard ? "-left-4 left-triangle" : "right-0 right-triangle"
          }`}
        >
          <AnimeHoverCardDetails
            isVisible={hoveredAnime === media.id}
            animeDetails={media}
            handleMouseLeave={handleMouseLeave}
            isLastCard={isLastCard}
          />
        </div>
      )}
    </>
  );
};

export default CardType;
