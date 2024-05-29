"use client";

import { useEffect, useRef, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { BookmarkIcon, DotFilledIcon, PlayIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { getEmoji, getMonthName } from "@/util";

import useCardType from "@/hooks/useCardType";
import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

import { noImg } from "@/consts";
import LoginWrapper from "@/ui/LoginWrapper";
import YouTube from "react-youtube";
import Modal from "../../Modal";
import AddToListForm from "./Modal/AddToListForm";

const DescriptiveTypeRefactored = ({ media, isCardHovered }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const { handleMouseEnter, handleMouseLeave } = useShowAnimeInfo();
  const { cardType } = useCardType();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);
  const [thumbnailBounds, setThumbnailBounds] = useState(null);
  const thumbnailRef = useRef(null);

  const {
    episodes,
    nextAiringEpisode,
    startDate,
    description,
    genres = [],
    season,
    trailer,
    title,
  } = media;

  const { timeUntilAiring, episode } = nextAiringEpisode || {
    timeUntilAiring: "",
    episode: "",
  };

  const [seconds, setSeconds] = useState(timeUntilAiring);

  useEffect(() => {
    if (seconds <= 0) {
      // Stop the countdown when it reaches 0
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  function convertSecondsToDHMS(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);

    let timeString = "";
    if (days > 0) timeString += `${days}d `;
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    timeString += `${sec}s`;

    return timeString;
  }

  const studioName = media?.studios?.nodes?.[0]?.name || "Unknown";
  const MAX_DESCRIPTION_LENGTH = 220;
  const truncatedDescription =
    !!description && description?.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description || "No description available for this anime... yet!";
  const { id, site, thumbnail } = trailer || {
    id: null,
    site: null,
    thumbnail: "",
  };

  const seasonString = season
    ? `${season[0]}${season.slice(1).toLowerCase()}`
    : "";
  const episodeString = episodes
    ? `${episodes} ${episodes !== 1 ? "episodes" : "episode"}`
    : "Unknown";
  const startDateString = startDate?.month
    ? `${getMonthName(startDate.month)} ${startDate.day} ${startDate.year}`
    : "Not yet released";
  const likedPercentage = media?.averageScore;

  const handleTrailerClick = () => {
    if (thumbnailRef.current) {
      setThumbnailBounds(thumbnailRef.current.getBoundingClientRect());
      setIsExpanded(true);
    }

    if (!isThumbnailVisible) setIsThumbnailVisible(true);

    // Hide the thumbnail after animation is complete
    setTimeout(() => {
      setIsThumbnailVisible(false);
    }, 500); // match the duration of the animation
  };
  const handleBackdropClick = () => {
    setIsExpanded(false);
    setIsThumbnailVisible(false);
  };

  const addToListButton = (
    <button
      className="p-2 md:p-3 bg-white rounded-full cursor-pointer shadow-md tooltip"
      data-tip="Add to list"
    >
      <BookmarkIcon />
    </button>
  );

  const isSignedInAddToListButton = () =>
    isSignedIn ? (
      addToListButton
    ) : (
      <LoginWrapper signIn>{addToListButton}</LoginWrapper>
    );
  const descriptionClass = isCardHovered
    ? "overflow-y-auto" // Enable scrolling and set a max height
    : "overflow-hidden";

  const seasonClass =
    season == "SPRING"
      ? "text-emerald-500"
      : season == "SUMMER"
      ? "text-amber-500"
      : season == "FALL"
      ? "text-yellow-500"
      : season == "WINTER"
      ? "text-cyan-500"
      : "text-grey-700";

  const seasonText = !!season
    ? season?.split("")[0] + season?.slice(1).toLowerCase()
    : "";

  return (
    <div className="w-full h-full shadow-custom rounded-none sm:rounded-md">
      <div className="flex w-full h-full max-h-52 md:max-h-56 overflow-hidden rounded-none md:rounded-md">
        {/* Left Side */}
        <div
          className="w-2/5 min-w-[150px] max-w-[160px] relative md:h-full"
          role="button"
          onClick={() => {
            router.push(`/anime-details/${media.id}`);
          }}
        >
          {convertSecondsToDHMS(seconds) !== "0s" && (
            <div className="flex items-center justify-center  z-10 absolute w-full h-fit bg-slate-900 top-0 opacity-80 p-1 text-xs">
              {" "}
              <span className="text-white invisible">
                EP{episode}: {convertSecondsToDHMS(seconds)}
              </span>
            </div>
          )}
          {convertSecondsToDHMS(seconds) !== "0s" && (
            <div className="flex items-center justify-center z-10 absolute w-full h-fit bg-none top-0  p-1 text-xs ">
              {" "}
              <span className="text-white text-center">
                EP{episode}: {convertSecondsToDHMS(seconds)}
              </span>
            </div>
          )}
          <img
            // role="button"

            className="w-full h-full max-h-full"
            src={media.coverImage.large || noImg}
            alt="Cover Image"
          />
          {/* <Image
            sizes="(max-width: 1200px) 100%"
            width={media.coverImage.large ? 225 : 150}
            height={media.coverImage.large ? 350 : 250}
            className="max-h-full"
            src={media.coverImage.large || ""}
            alt="Cover Image"
          /> */}
          {/* Opaque Background */}
          <div className="z-10 absolute w-full h-fit bg-slate-900 bottom-0 opacity-70 p-3 md:p-4">
            {/* used as a spacer for the opaque background */}
            <h3 className="w-full flex flex-col gap-2 opacity-0 text-white font-semibold text-sm">
              {/* {media.title.english || media.title.native} */}
              {/* {!!startDate?.month
                ? `${getMonthName(startDate?.month)} ${startDate?.day} ${
                    startDate?.year
                  }`
                : "Not yet released"} */}
              <span className="text-xs">{studioName}</span>
            </h3>
          </div>
          {/*  Anime Title Text */}
          <div className="z-20 absolute h-fit bottom-0 p-3 md:p-4">
            <h3 className="w-full flex flex-col gap-2 text-white font-semibold text-sm">
              {/* {media.title.english || media.title.native} */}
              {/* {!!startDate?.month
                ? `${getMonthName(startDate?.month)} ${startDate?.day} ${
                    startDate?.year
                  }`
                : "Not yet released"} */}
              <span className="text-blue-300 text-xs text-left ">
                {studioName}
              </span>
            </h3>
          </div>
        </div>
        {/* Right Side */}
        <div
          className={`w-full grid grid-rows-[3fr 1fr] bg-white ${descriptionClass}`}
        >
          <div className="overflow-y-auto px-4 pt-4 md:px-6 md:pt-6">
            <AnimatePresence key={media?.id + "animate"}>
              <div
                className={`${
                  isCardHovered ? "overflow-x-hidden" : "overflow-hidden"
                } h-full `}
              >
                <motion.div
                  className={`${
                    !!thumbnail
                      ? "w-[200%] grid-cols-2"
                      : "w-[100%] grid-cols-1 cursor-default"
                  } grid `}
                  animate={
                    !!thumbnail && {
                      x: isCardHovered ? "-50%" : "0%",
                    }
                  }
                  transition={{ duration: 0.3, delay: 0.1, type: "tween" }}
                >
                  <div className="min-h-[75px] w-full flex  justify-between font-medium">
                    <div className="flex flex-col gap-1 ">
                      <div className="flex">
                        <h6 className="flex items-center text-xxs md:text-xs text-grey-500">
                          {episodes && !!season
                            ? `${episodes} ${
                                episodes != 1 ? "episodes" : "episode"
                              }`
                            : !episodes
                            ? !!season
                              ? `Ongoing`
                              : "Ongoing"
                            : `Unknown`}
                          <span>
                            <DotFilledIcon className="w-2 h-2 mx-1" />
                          </span>
                          <span className={seasonClass}>{seasonText}</span>
                        </h6>
                      </div>
                      <div className="flex gap-1 text-lg">
                        <h6 className="text-xs sm:text-sm md:text-base text-grey-700 max-w-xs">
                          {/* {!!startDate?.month
                            ? `${getMonthName(startDate?.month)} ${
                                startDate?.day
                              } ${startDate?.year}`
                            : "Not yet released"} */}
                          {title?.english || title?.native}
                        </h6>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-xs sm:text-sm md:text-base">
                        {likedPercentage &&
                          `${getEmoji(likedPercentage)} ${likedPercentage}%`}
                      </p>
                    </div>
                  </div>
                  {!!id && site === "youtube" && (
                    <div className="relative flex justify-between gap-2">
                      <h6 className="text-xxs md:text-xs w-1/2">
                        {/* <span className="text-2xl font-bold">#</span> */}
                        {title?.native || title?.english}
                      </h6>
                      <div
                        className="relative"
                        role="button"
                        onClick={handleTrailerClick}
                        style={{ width: "175px", height: "75px" }}
                      >
                        <img
                          style={{
                            width: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                          }}
                          ref={thumbnailRef}
                          src={thumbnail || noImg}
                          alt="Trailer Thumbnail"
                        />
                        {/* <Image
                          fill
                          sizes="(max-width: 1200px) 100%"
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                          ref={thumbnailRef}
                          src={thumbnail}
                          alt="Trailer Thumbnail"
                        /> */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className="fas fa-play text-white"></i>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
                <div
                  className={`${
                    !!thumbnail ? "mt-4" : "mt-4"
                  } text-xxs md:text-sm`}
                >
                  <div
                    className={`${
                      isCardHovered ? "pb-6 text-grey-700" : "text-grey-700"
                    }`}
                    dangerouslySetInnerHTML={
                      !isCardHovered
                        ? { __html: truncatedDescription }
                        : { __html: description || "" }
                    }
                  ></div>
                </div>
              </div>

              {isExpanded && (
                <div
                  className="fixed z-50 top-0 left-0 w-screen h-screen bg-slate-800 bg-opacity-75 flex items-center justify-center overflow-hidden"
                  onClick={handleBackdropClick}
                >
                  <motion.section
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative aspect-w-16 aspect-h-9 max-w-screen-2xl flex items-center justify-center"
                  >
                    <YouTube
                      videoId={id || ""}
                      style={{ width: "100%", height: "100%" }}
                      className="hidden md:block"
                      opts={{
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          modestbranding: 1,
                          // Mute the video when it's not visible
                          mute: window.innerWidth < 768 ? 1 : 0,
                        },
                      }}
                    />
                    <YouTube
                      videoId={id || ""}
                      className="md:hidden flex items-center justify-center"
                      opts={{
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          modestbranding: 1,
                          // Mute the video when it's not visible
                          mute: window.innerWidth > 768 ? 1 : 0,
                        },
                        height: "250",
                        width: "350",
                      }}
                    />
                  </motion.section>
                </div>
              )}
            </AnimatePresence>
          </div>
          {/* Genres */}
          <div className="w-full flex items-center justify-between px-4 md:px-6 py-2 mt-auto bg-genre">
            <div className="flex flex-wrap items-center mr-2 gap-1 md:gap-2">
              {genres.slice(0, 4).map((genre, i) => (
                <span
                  className={`${
                    i > 1 ? "hidden md:flex" : ""
                  } h-3 md:h-4  text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1`}
                  key={`${genre + i + cardType + "second"}`}
                >
                  {genre?.toLowerCase()}
                </span>
              ))}
            </div>
            <div className="relative flex">
              {/* <AnimeHoverOptions /> */}
              {!!id && site === "youtube" && (
                <button
                  className="p-2 md:p-3  bg-white rounded-full cursor-pointer shadow-md mr-1 md:mr-2"
                  onClick={() => {
                    handleTrailerClick();
                  }}
                >
                  <PlayIcon className="text-[#3CB4F0]" />
                </button>
              )}

              {isSignedInAddToListButton()}
              <Modal id="add_to_list_modal">
                <AddToListForm />
              </Modal>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Trailer Section */}
      {isExpanded && (
        <motion.div
          initial={{
            top: thumbnailBounds?.top || "0",
            left: thumbnailBounds?.left || "0",
            width: thumbnailBounds?.width || "0",
            height: thumbnailBounds?.height || "0",
            opacity: 0,
          }}
          animate={{
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            opacity: 1,
          }}
          exit={{
            top: thumbnailBounds?.top || "0",
            left: thumbnailBounds?.left || "0",
            width: thumbnailBounds?.width || "0",
            height: thumbnailBounds?.height || "0",
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          className="fixed z-50 aspect-w-16 aspect-h-9 translate-x-1/2 translate-y-1/2 max-w-screen-2xl"
          onClick={() => setIsExpanded(false)}
        >
          <div style={{ width: "175px", height: "75px" }}>
            <img
              style={{ width: "100%", objectFit: "cover", maxHeight: "100%" }}
              className={isThumbnailVisible ? "block" : "hidden"}
              src={thumbnail || noImg}
              alt="Trailer Thumbnail"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DescriptiveTypeRefactored;
