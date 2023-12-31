"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { BookmarkIcon, DotFilledIcon } from "@radix-ui/react-icons";

import { formatDate, formatGenres, formatMediaType } from "@/util/format";

import { Media } from "@/types/anime";
import LoginWrapper from "@/ui/LoginWrapper";
import Image from "next/image";
import Modal from "../../Modal";
import AddToListForm from "./Modal/AddToListForm";

const ListType = ({ anime, index }: { anime: Media; index: number }) => {
  const { isSignedIn } = useUser();

  const animeEpisodes = () =>
    anime?.episodes
      ? `${anime?.episodes > 1 ? `${anime?.episodes} eps` : "1 episode"}`
      : `Ongoing`;

  const addToListButton = (
    <button
      className="p-4 rounded-full cursor-pointer"
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
    <li
      key={anime?.id}
      className="flex flex-col md:flex-row items-center mb-4 w-full"
      tabIndex={0}
    >
      <span
        className="order-2 md:order-1 hidden md:block w-fit mr-4 font-bold text-xl"
        style={{ color: "#8ba0b2" }}
      >
        #{index + 1}
      </span>
      <Link
        href={`/anime-details/${anime?.id}`}
        className="order-1 md:order-2 flex w-full"
      >
        <div className="w-full bg-white rounded-md shadow-box shadow-custom">
          <div className="text-slate-800">
            <div className="flex w-full">
              <div className="md:w-1/6 lg:w-[7rem] p-3 md:p-4">
                <Image
                  width={50}
                  height={62}
                  className="w-20 h-full md:h-20 lg:h-28 md:w-full object-cover"
                  src={anime?.coverImage?.large || ""}
                  alt={
                    anime?.title?.english ||
                    anime?.title?.native ||
                    "Anime Cover"
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center w-full">
                <div className="order-3 md:order-3 w-full md:w-2/3 lg:w-1/2 pr-2 lg:pr-0">
                  <h3 className="font-semibold text-sm md:text-base text-slate-700 lg:text-lg">
                    {anime?.title?.english || anime?.title?.native}
                  </h3>
                  <p className="text-xs md:text-sm">
                    {formatGenres(anime?.genres)}
                  </p>
                  <div className="flex items-center gap-[.3px] lg:hidden w-full pr-4 md:ml-auto">
                    <span className="text-sm">
                      {formatDate(
                        anime?.endDate || anime?.startDate,
                        "seasonYear"
                      ) || "N/A"}
                    </span>
                    <DotFilledIcon className="w-2 h-2" />
                    {anime?.status === "RELEASING" &&
                    anime?.nextAiringEpisode ? (
                      <span className="text-xs md:text-sm text-gray-500">
                        Ep {anime?.nextAiringEpisode?.episode} airing in{" "}
                        {Math.floor(
                          anime?.nextAiringEpisode?.timeUntilAiring / 86400
                        )}{" "}
                        days
                      </span>
                    ) : (
                      <span className="text-xs md:text-sm text-gray-500">
                        {anime?.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex md:w-2/3 lg:w-1/3 order-4">
                  <div className="md:flex-col w-full">
                    <p className="text-xs md:text-base">{`${anime?.averageScore}%`}</p>
                    <p className="text-xs md:text-sm">{`${
                      anime?.popularity && anime?.popularity.toLocaleString()
                    } users`}</p>
                  </div>
                  <div className="w-full flex items-center">
                    <p className="text-xs md:text-base">
                      {formatMediaType(anime?.format)}
                    </p>
                    <p className="text-xs md:text-sm">{animeEpisodes()}</p>
                  </div>
                </div>
                <div className="hidden lg:block order-5 md:order-6 w-full md:w-1/6 lg:w-[15.3%] text-left md:text-right pr-4 md:ml-auto">
                  <span className="text-xs md:text-sm">
                    {formatDate(
                      anime?.endDate || anime?.startDate,
                      "seasonYear"
                    ) || "N/A"}
                  </span>
                  <br /> {""}
                  {anime?.status === "RELEASING" && anime?.nextAiringEpisode ? (
                    <span className="text-xs md:text-sm text-gray-500">
                      Ep {anime?.nextAiringEpisode?.episode} airing in{" "}
                      {Math.floor(
                        anime?.nextAiringEpisode?.timeUntilAiring / 86400
                      )}{" "}
                      days
                    </span>
                  ) : (
                    <span className="text-xs md:text-sm text-gray-500">
                      {anime?.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="order-7 lg:order-7 absolute lg:relative lg:top-0 top-[-.8rem] right-2 lg:right-0 rounded-full bg-white shadow-lg lg:shadow-none lg:bg-transparent  lg:flex lg:items-center">
        {isSignedInAddToListButton()}
        <Modal id="add_to_list_modal">
          <AddToListForm />
        </Modal>
      </div>
    </li>
  );
};

export default ListType;
