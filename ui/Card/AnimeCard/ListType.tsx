"use client";

import { useRef, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import YouTube from "react-youtube";

import {
  BookmarkIcon,
  DotFilledIcon,
  PersonIcon,
  PlayIcon,
} from "@radix-ui/react-icons";

import { Media } from "@/types/anime";

import { formatDate } from "@/util/format";

import { noImg } from "@/consts";

import useCardType from "@/hooks/useCardType";

import LoginWrapper from "@/ui/LoginWrapper";
import Modal from "../../Modal";
import AddToListForm from "./Modal/AddToListForm";

const ListType = ({ anime, index }: { anime: Media; index: number }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { cardType } = useCardType();

  const [isExpanded, setIsExpanded] = useState(false);
  const [thumbnailBounds, setThumbnailBounds] = useState<DOMRect | null>(null);
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);

  const playTailerButtonRef = useRef<HTMLButtonElement>(null);
  const addToListButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);

  const { trailer } = anime;
  const { id, site, thumbnail } = trailer || {
    id: null,
    site: null,
    thumbnail: "",
  };

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

  const animeEpisodes = () =>
    anime?.episodes
      ? `${anime?.episodes > 1 ? `${anime?.episodes} eps` : "1 ep"}`
      : `Ongoing`;

  const addToListButton = (
    <button
      className="p-2 md:p-3 rounded-full cursor-pointer shadow-md"
      ref={addToListButtonRef}
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
      <BookmarkIcon className="lg:text-slate-800" />
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
      <li
        key={anime?.id}
        className="flex flex-col md:flex-row items-center mb-4 w-full relative"
        onClick={(e) => {
          // Check if the click is on the image or its child elements
          if (
            playTailerButtonRef.current &&
            playTailerButtonRef.current.contains(e.target as Node)
          ) {
            // Do nothing
            handleTrailerClick();
            return;
          } else if (
            addToListButtonRef.current &&
            addToListButtonRef.current.contains(e.target as Node)
          ) {
            // Do nothing
            return;
          } else {
            // Navigate to anime details
            router.push(`/anime-details/${anime?.id}`);
          }
        }}
      >
        <span
          className="hidden lg:block w-fit mr-4 font-bold text-xl"
          style={{ color: "#8ba0b2" }}
        >
          #{index + 1}
        </span>
        <div className="flex w-full min-h-[115px]">
          <div className="w-full bg-white rounded-md shadow-box shadow-custom">
            <div className="text-slate-800">
              <div className="flex w-full min-h-[115px]">
                <div
                  className={`relative md:w-24 lg:w-[7rem] p-3 md:p-4 ${
                    !!anime?.trailer?.thumbnail !== false && "cursor-pointer"
                  }`}
                  // ref={thumbnailImageDivRef}
                >
                  <img
                    className="w-20 h-full md:h-20 lg:h-28 md:w-full object-cover"
                    src={anime?.coverImage?.large || noImg}
                    alt={
                      anime?.title?.english ||
                      anime?.title?.native ||
                      "Anime Cover"
                    }
                    ref={thumbnailRef}
                  />
                  {/* <Image
                    width={50}
                    height={62}
                    className="w-20 h-full md:h-20 lg:h-28 md:w-full object-cover"
                    src={anime?.coverImage?.large || noImg}
                    alt={
                      anime?.title?.english ||
                      anime?.title?.native ||
                      "Anime Cover"
                    }
                    ref={thumbnailRef}
                  /> */}
                </div>
                <div className="flex flex-col py-4 md:flex-row md:items-center w-full">
                  <div className="w-full h-full flex flex-col lg:justify-center md:w-1/2 lg:w-2/3  pr-2 mr-8 lg:pr-0 cursor-pointer">
                    <div className="flex items-center">
                      <h3 className="mt-2 mr-12 md:mr-0 font-semibold text-sm  text-slate-700 lg:text-lg lg:mt-0">
                        {anime?.title?.english || anime?.title?.native}
                      </h3>

                      <p className="-mt-2 absolute top-1/2 -translate-y-1/2 right-4 text-sm md:hidden">{`${anime?.averageScore}%`}</p>
                    </div>

                    <div
                      className="flex flex-wrap gap-1 mt-1"
                      style={{ width: "calc(100% - 2rem" }}
                    >
                      {anime?.genres &&
                        anime?.genres.slice(0, 4).map((genre, i) => (
                          <span
                            className={`${
                              i > 1 ? "hidden md:flex" : ""
                            } h-3 md:h-4  text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1`}
                            key={`${genre + i + cardType}`}
                          >
                            {genre?.toLowerCase()}
                          </span>
                        ))}{" "}
                    </div>
                    <div className="hidden md:mt-auto md:flex items-center gap-[.3px] lg:hidden w-full pr-4 md:ml-auto">
                      <span className="text-xs lg:text-sm">
                        {formatDate(
                          anime?.endDate || anime?.startDate,
                          "seasonYear"
                        ) || "N/A"}
                      </span>
                      <DotFilledIcon className="w-2 h-2" />
                      {anime?.status === "RELEASING" &&
                      anime?.nextAiringEpisode ? (
                        <span className="text-xs lg:text-sm text-gray-500">
                          Ep {anime?.nextAiringEpisode?.episode} airing in{" "}
                          {Math.floor(
                            anime?.nextAiringEpisode?.timeUntilAiring / 86400
                          )}{" "}
                          days
                        </span>
                      ) : (
                        <span className="text-xs lg:text-sm text-gray-500">
                          {anime?.status &&
                            anime?.status?.slice(0, 1) +
                              anime?.status
                                ?.replace(/_/g, " ")
                                .toLowerCase()
                                .slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <div
                    className={`${
                      !!id && site === "youtube"
                        ? "lg:block tooltip"
                        : "lg:block opacity-0"
                    }  rounded-full hidden mr-auto bg-white shadow-md`}
                    data-tip="Play Trailer"
                  >
                    <button
                      className={`p-4 rounded-full ${
                        !!id && site === "youtube"
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                      ref={playTailerButtonRef}
                    >
                      <PlayIcon className="text-[#3CB4F0]" />
                    </button>
                  </div> */}
                  <div className="md:w-1/5 flex flex-row items-center gap-[.3px] md:grid grid-cols-2 md:gap-1 lg:gap-0 ">
                    <p className="order-1 lg:order:2 text-xs md:text-sm">
                      {animeEpisodes()}
                    </p>
                    <DotFilledIcon className="order-2 md:hidden w-2 h-2" />
                    <p className="order-2 -mt-2 absolute top-1/2 -translate-y-1/2 right-4 text-sm lg:hidden">{`${
                      (anime?.averageScore && anime?.averageScore + "%") || ""
                    }`}</p>
                    <p className="flex items-center gap-1 order-3 lg:order-1 text-xs md:text-sm">
                      <PersonIcon className="w-3 h-3" />
                      {`${
                        anime?.popularity && anime?.popularity.toLocaleString()
                      }`}
                    </p>
                  </div>
                  <div className="md:hidden flex items-center gap-[.3px] lg:hidden w-full pr-4 md:ml-auto">
                    <span className="text-xs lg:text-sm">
                      {formatDate(
                        anime?.endDate || anime?.startDate,
                        "seasonYear"
                      ) || "N/A"}
                    </span>
                    <DotFilledIcon className="w-2 h-2" />
                    {anime?.status === "RELEASING" &&
                    anime?.nextAiringEpisode ? (
                      <span className="text-xs lg:text-sm text-gray-500">
                        Ep {anime?.nextAiringEpisode?.episode} airing in{" "}
                        {Math.floor(
                          anime?.nextAiringEpisode?.timeUntilAiring / 86400
                        )}{" "}
                        days
                      </span>
                    ) : (
                      <span className="text-xs lg:text-sm text-gray-500">
                        {anime?.status &&
                          anime?.status?.slice(0, 1) +
                            anime?.status
                              ?.replace(/_/g, " ")
                              .toLowerCase()
                              .slice(1)}
                      </span>
                    )}
                  </div>
                  <div className="hidden lg:block w-full md:w-1/6 lg:w-[15.3%] text-left md:text-right pr-4 md:ml-auto">
                    <span className="text-xs md:text-sm">
                      {formatDate(
                        anime?.endDate || anime?.startDate,
                        "seasonYear"
                      ) || "N/A"}
                    </span>
                    <br /> {""}
                    {anime?.status === "RELEASING" &&
                    anime?.nextAiringEpisode ? (
                      <span className="text-xs md:text-sm text-gray-500">
                        Ep {anime?.nextAiringEpisode?.episode} airing in
                        <br />
                        {Math.floor(
                          anime?.nextAiringEpisode?.timeUntilAiring / 86400
                        )}{" "}
                        days
                      </span>
                    ) : (
                      <span className="text-xs lg:text-sm text-gray-500">
                        {anime?.status &&
                          anime?.status?.slice(0, 1) +
                            anime?.status
                              ?.replace(/_/g, " ")
                              .toLowerCase()
                              .slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!!id && site === "youtube" && (
          <div
            className={`${
              !!id && site === "youtube" ? "block tooltip" : "hidden"
            } order-7 lg:order-7 absolute top-[-.8rem] right-12 md:right-14 rounded-full bg-white shadow-md`}
            data-tip="Play Trailer"
          >
            <button
              className="p-2 md:p-3 rounded-full cursor-pointer"
              ref={playTailerButtonRef}
            >
              <PlayIcon className="text-[#3CB4F0]" />
            </button>
          </div>
        )}
        <div
          className="tooltip order-8 lg:order-8 absolute  top-[-.8rem] right-2 rounded-full bg-yellow-300 lshadow-md "
          data-tip="Add to List"
        >
          {isSignedInAddToListButton()}
          <Modal id="add_to_list_modal">
            <AddToListForm />
          </Modal>
        </div>
      </li>

      {isExpanded && (
        <div
          className="fixed z-50 top-0 left-0 w-screen h-screen bg-slate-800 bg-opacity-75 flex items-center justify-center overflow-hidden"
          onClick={handleBackdropClick}
        >
          <motion.section
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
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
    </>
  );
};

export default ListType;
