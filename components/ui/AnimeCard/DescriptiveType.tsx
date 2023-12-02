"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image"; // Assuming Image is from 'next/image'
import YouTube from "react-youtube"; // Assuming YouTube component from 'react-youtube'
import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

const DescriptiveType = ({ media, isCardHovered }) => {
  const { hoveredAnime, handleMouseEnter, handleMouseLeave } =
    useShowAnimeInfo();

  const [isAnimeHoverOptionsHovered, setIsAnimeHoverOptionsHovered] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [thumbnailBounds, setThumbnailBounds] = useState(null);
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);

  const isVisible = hoveredAnime === media.id;

  const thumbnailRef = useRef(null);

  const router = useRouter();

  const studioName = media?.studios?.nodes[0]?.name || "Unknown";

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
  } = media;
  const nextEpisodeDays = media?.nextAiringEpisode
    ? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
    : null;

  const MAX_DESCRIPTION_LENGTH = 220;
  const truncatedDescription =
    !!description && description?.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;
  const { id, site, thumbnail } = trailer || {
    id: null,
    site: null,
    thumbnail: null,
  };
  const likedPercentage = media?.averageScore;

  // Handler functions
  const handleBackdropClick = () => {
    setIsExpanded(false);
    setIsThumbnailVisible(false);
  };

  const handleTrailerClick = () => {
    if (thumbnailRef.current === null) return;
    setThumbnailBounds(thumbnailRef.current.getBoundingClientRect());
    setIsExpanded(true);
    setIsThumbnailVisible(true);
    setTimeout(() => {
      setIsThumbnailVisible(false);
    }, 500); // match the duration of the animation
  };

  return (
    <>
      <div className="relative w-full h-48 xl:h-72 xl:grid xl:grid-cols-[auto,1fr] bg-gray-700 xl:bg-white rounded-md overflow-hidden group xl:shadow-custom"></div>
      {isExpanded && (
        <AnimatePresence>
          <div className="hidden xl:flex absolute flex-col left-[14.3rem] top-0  w-[25.2rem] h-72">
            <div
              className={`mt-6 mr-6 ml-6 h-60 ${
                isCardHovered
                  ? "overflow-y-scroll overflow-x-hidden"
                  : "overflow-hidden"
              }`}
            >
              {/* <div className="flex flex-col flex-wr">
				   <div className="w-full flex justify-between font-medium">
					   {status === "FINISHED" ? (
						   <>
							   <div className="w-full flex items-center justify-between font-medium">
								   <div className="text-lg flex gap-1 text-gray-700">
									   <h6>
										   {season?.split("")[0] + season?.slice(1).toLowerCase()}
									   </h6>{" "}
									   <h6>{`${seasonYear}`}</h6>
								   </div>
								   <div>
									   {getEmoji(likedPercentage)} {likedPercentage}%
								   </div>
							   </div>
						   </>
					   ) : (
						   <>
							   <div className="w-3/4">
								   <h6 className="text-lg text-gray-800">
									   Ep {!!currentEpisode && currentEpisode + 1} airing in
									   {nextEpisodeDays
										   ? ` ${nextEpisodeDays} days`
										   : ` ${convertTimeUntilAiring(
												   hoursUntilNextEpisode
											 )} hours`}
								   </h6>
							   </div>
							   <span>
								   {getEmoji(likedPercentage)} {likedPercentage}%
							   </span>
						   </>
					   )}
				   </div>
			   </div> */}
              <motion.div
                role="button"
                onClick={handleTrailerClick}
                className="w-[201%] grid grid-cols-2"
                animate={{
                  x: isCardHovered ? "-50%" : "0%",
                }}
                transition={{ duration: 0.3, delay: 0.1, type: "tween" }}
              >
                <div className="w-full flex  justify-between font-medium">
                  <div className="flex flex-col gap-1 text-gray-700">
                    <div className="flex">
                      <h6 className="text-xs">
                        {episodes
                          ? `${episodes} episodes aired in`
                          : "Ongoing, aired in "}
                        {season?.split("")[0] + season?.slice(1).toLowerCase()}
                      </h6>
                    </div>
                    <div className="flex gap-1 text-lg">
                      <h6>
                        {getMonthName(startDate?.month)} {startDate?.day},{" "}
                        {startDate?.year}{" "}
                      </h6>
                    </div>
                  </div>
                  <div>
                    {getEmoji(likedPercentage)} {likedPercentage}%
                  </div>
                </div>
                {!!id && site === "youtube" && (
                  <>
                    {!!thumbnail && (
                      <div className="relative flex justify-between gap-2 pr-2 pb-1">
                        <h6 className="text-lg w-1/2">
                          <span className="text-2xl font-bold">#</span>
                          {title?.native}
                        </h6>
                        <div
                          className="relative"
                          style={{ width: "175px", height: "75px" }}
                        >
                          <Image
                            ref={thumbnailRef}
                            src={thumbnail}
                            alt="Trailer Thumbnail"
                            layout="fill"
                            objectFit="cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fas fa-play text-white"></i>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
              <div className={`${!!thumbnail ? "" : "mt-4"} text-sm`}>
                <div
                  dangerouslySetInnerHTML={
                    !isCardHovered
                      ? { __html: truncatedDescription + "..." }
                      : { __html: description }
                  }
                ></div>
              </div>
            </div>
            <div className="px-4 py-2 flex justify-between mt-auto bg-genre">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {genres.slice(0, 4).map((genre, i) => (
                  <span
                    className="h-6 text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1"
                    key={i}
                  >
                    {genre?.toLowerCase()}
                  </span>
                ))}
              </div>
              <div
                onMouseEnter={() => setIsAnimeHoverOptionsHovered(true)}
                onMouseLeave={() => setIsAnimeHoverOptionsHovered(false)}
              >
                <AnimeHoverOptions />
              </div>
            </div>
          </div>
          {isExpanded && (
            <AnimatePresence>
              <motion.div
                initial={{
                  top: thumbnailBounds?.top || "0",
                  left: thumbnailBounds?.left || "0",
                  width: thumbnailBounds?.width || "0",
                  height: thumbnailBounds?.height || "0",
                }}
                animate={{
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                exit={{
                  top: thumbnailBounds?.top || "0",
                  left: thumbnailBounds?.left || "0",
                  width: thumbnailBounds?.width || "0",
                  height: thumbnailBounds?.height || "0",
                }}
                transition={{ duration: 0.5 }}
                className="fixed z-50 aspect-w-16 aspect-h-9 max-w-screen-2xl"
                // style={{
                // 	position: "fixed",
                // 	zIndex: 100,
                // 	borderRadius: "5px",
                // }}
              >
                <Image
                  className={isThumbnailVisible ? "block" : "hidden"}
                  src={thumbnail}
                  alt="Trailer Thumbnail"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </AnimatePresence>
          )}
          {isExpanded && (
            <div
              className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-hidden"
              onClick={handleBackdropClick}
            >
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative aspect-w-16 aspect-h-9 max-w-screen-2xl"
              >
                <YouTube
                  videoId={id}
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      modestbranding: 1,
                    },
                  }}
                />
              </motion.section>
            </div>
          )}
        </AnimatePresence>
      )}
      {/* {hoveredAnime === media.id && (
        <div className={`xl:hidden absolute top-0 ...`}>
          <AnimeHoverCardDetails
            isVisible={hoveredAnime === media.id}
            animeDetails={media}
            isLastCard={isLastCard}
          />
        </div>
      )} */}
    </>
  );
};

export default DescriptiveType;
