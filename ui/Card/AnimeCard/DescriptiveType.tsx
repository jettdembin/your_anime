"use client";

import { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Corrected import
import YouTube from "react-youtube";

import { BookmarkIcon } from "@radix-ui/react-icons";

import { Media } from "@/types/anime";

import { getEmoji, getMonthName } from "@/util";

import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

import LoginWrapper from "@/ui/LoginWrapper";
import { useUser } from "@clerk/nextjs";
import Modal from "../../Modal";
import AddToListForm from "./Modal/AddToListForm";

type Props = {
  media: Media;
  isCardHovered: boolean;
};

const DescriptiveType: React.FC<Props> = ({ media, isCardHovered }) => {
  const { isSignedIn } = useUser();

  const { handleMouseEnter, handleMouseLeave } = useShowAnimeInfo();

  const [isAnimeHoverOptionsHovered, setIsAnimeHoverOptionsHovered] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [thumbnailBounds, setThumbnailBounds] = useState<DOMRect | null>(null);
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);

  const thumbnailRef = useRef<HTMLImageElement>(null);
  const addToListRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const studioName = media?.studios?.nodes?.[0]?.name || "Unknown";

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
      : description || "No description available for this anime... yet!";
  const { id, site, thumbnail } = trailer || {
    id: null,
    site: null,
    thumbnail: "",
  };
  const likedPercentage = media?.averageScore;

  // Handler functions
  const handleBackdropClick = () => {
    setIsExpanded(false);
    setIsThumbnailVisible(false);
  };

  const handleTrailerClick = () => {
    if (thumbnailRef.current != null) {
      setThumbnailBounds(thumbnailRef.current.getBoundingClientRect());
      setIsExpanded(true);
    }

    if (!isThumbnailVisible) setIsThumbnailVisible(true);

    // Hide the thumbnail after animation is complete
    setTimeout(() => {
      setIsThumbnailVisible(false);
    }, 500); // match the duration of the animation
  };
  const addToListButton = (
    <button
      className="p-2 md:p-4 bg-white rounded-full cursor-pointer shadow-md"
      onClick={() => {
        if (isSignedIn) {
          const dialog = document.getElementById(
            "add_to_list_modal"
          ) as HTMLDialogElement | null;
          if (dialog) {
            dialog.showModal();
          }
        }
        // document.getElementById("add_to_list_modal").showModal()
      }}
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

  return (
    <>
      <div
        className="flex flex-col relative w-full h-full  md:grid md:grid-cols-[auto,1fr] bg-white rounded-sm sm:rounded-md overflow-hidden group shadow-custom min-h-[260px]"
        role="button"
        tabIndex={0}
        onMouseEnter={() => {
          handleMouseEnter(media.id);
          console.log(media.id);
        }}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          router.push(`/anime-details/${media.id}`);
        }}
      >
        <div className="relative">
          <div className="overflow-hidden max-h-[260px] h-full max-w-[10rem] md:max-w-[12rem] lg:max-w-[12.5rem]">
            <img
              src={media.coverImage.large || ""}
              alt={media.title.english || media.title.native || ""}
              // objectFit="cover"
              className="min-w-[10rem] lg:min-w-[12.5rem] w-full h-full object-cover transition duration-300 ease-in-out transform scale-105 group-hover:scale-105"
            />

            <div className="block z-20 w-[10rem] md:w-full bg-gray-900 h-fit absolute bottom-0 opacity-70 p-3 md:p-4">
              {/* used as a spacer for the opaque background */}
              <h3 className="w-full md:w-auto opacity-0 text-white font-semibold text-sm flex flex-col gap-2">
                {media.title.english || media.title.native}
                <span className="text-xs">{studioName}</span>
              </h3>
            </div>
          </div>
          <div className="p-3 md:p-4 z-30 block absolute w-[10rem] md:w-full h-fit bottom-0">
            <h3 className="w-full md:w-auto h-full flex flex-col gap-2 text-white font-semibold text-sm">
              {media.title.english || media.title.native}
              <span className="text-blue-300 text-xs">{studioName}</span>
            </h3>
          </div>
        </div>
        <div className="flex  px-4 py-2 md:flex items-center justify-between mt-auto bg-genre">
          <div className="flex flex-wrap items-center mr-2 gap-2">
            {genres.slice(0, 4).map((genre, i) => (
              <span
                className="h-4 text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1"
                key={`${genre + i}`}
              >
                {genre?.toLowerCase()}
              </span>
            ))}
          </div>
          <div
            onMouseEnter={() => setIsAnimeHoverOptionsHovered(true)}
            onMouseLeave={() => setIsAnimeHoverOptionsHovered(false)}
          >
            {/* <AnimeHoverOptions /> */}
            {isSignedInAddToListButton()}
            <Modal id="add_to_list_modal">
              <AddToListForm />
            </Modal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <div
          className="flex absolute flex-col left-[10rem] md:left-[12rem] lg:left-[12.5rem] top-0 h-64 w-[calc(100%-10rem)]  md:w-[calc(100%-12rem)] lg:w-[calc(100%-12.5rem)]"
          // style={{ width: "calc(100% - 12.5rem)" }}
        >
          <div
            className={`mt-6 mr-6 ml-6 mb-6 md:mb-0 h-full md:h-60 ${
              isCardHovered
                ? "overflow-y-scroll overflow-x-hidden"
                : "overflow-hidden"
            }`}
          >
            <motion.div
              role="button"
              onClick={handleTrailerClick}
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
              <div className="w-full flex  justify-between font-medium">
                <div className="flex flex-col gap-1 text-gray-700">
                  <div className="flex">
                    <h6 className="text-xxs">
                      {episodes && !!season
                        ? `${episodes} ${
                            episodes != 1 ? "episodes" : "episode"
                          } aired in ${
                            !!season
                              ? season?.split("")[0] +
                                season?.slice(1).toLowerCase()
                              : ""
                          }`
                        : !episodes
                        ? !!season
                          ? `Ongoing, aired in ${
                              season?.split("")[0] +
                              season?.slice(1).toLowerCase()
                            }`
                          : "Ongoing"
                        : `Unknown`}
                      {/* {!!season &&
                        season?.split("")[0] + season?.slice(1).toLowerCase()} */}
                    </h6>
                  </div>
                  <div className="flex gap-1 text-lg">
                    <h6 className="text-sm md:text-base">
                      {!!startDate?.month
                        ? `${getMonthName(startDate?.month)} ${
                            startDate?.day
                          } ${startDate?.year}`
                        : "Not yet released"}
                    </h6>
                  </div>
                </div>
                <div className="flex justify-end">
                  <p>
                    {likedPercentage &&
                      `${getEmoji(likedPercentage)} ${likedPercentage}%`}
                  </p>
                </div>
              </div>
              {!!id && site === "youtube" && (
                <div className="relative flex justify-between gap-2 pr-2 pb-1">
                  <h6 className="text-lg w-1/2">
                    <span className="text-2xl font-bold">#</span>
                    {title?.native || title?.english}
                  </h6>
                  <div
                    className="relative"
                    style={{ width: "175px", height: "75px" }}
                  >
                    <Image
                      fill
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                      ref={thumbnailRef}
                      src={thumbnail}
                      alt="Trailer Thumbnail"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-play text-white"></i>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            <div className={`${!!thumbnail ? "" : "mt-4"} text-sm`}>
              <div
                className={`${
                  isCardHovered ? "pb-6 text-gray-700" : "text-gray-700"
                }`}
                dangerouslySetInnerHTML={
                  !isCardHovered
                    ? { __html: truncatedDescription }
                    : { __html: description || "" }
                }
              ></div>
            </div>
          </div>
          <div className="hidden px-4 py-2 md:flex items-center justify-between mt-auto bg-genre">
            <div className="flex flex-wrap items-center mr-2 gap-2">
              {genres.slice(0, 4).map((genre, i) => (
                <span
                  className="h-6 text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1"
                  key={`${genre + i}`}
                >
                  {genre?.toLowerCase()}
                </span>
              ))}
            </div>
            <div
              onMouseEnter={() => setIsAnimeHoverOptionsHovered(true)}
              onMouseLeave={() => setIsAnimeHoverOptionsHovered(false)}
            >
              {/* <AnimeHoverOptions /> */}
              {isSignedInAddToListButton()}
              <Modal id="add_to_list_modal">
                <AddToListForm />
              </Modal>
            </div>
          </div>
        </div>

        {isExpanded && (
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
          >
            <Image
              fill
              style={{ width: "100%", objectFit: "cover" }}
              className={isThumbnailVisible ? "block" : "hidden"}
              src={thumbnail}
              alt="Trailer Thumbnail"
            />
          </motion.div>
        )}

        {isExpanded && (
          <div
            className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-hidden"
            onClick={handleBackdropClick}
          >
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative aspect-w-16 aspect-h-9 max-w-screen-2xl"
            >
              <YouTube
                videoId={id || ""}
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
    </>
  );
};

export default DescriptiveType;
