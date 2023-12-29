"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { BookmarkIcon } from "@radix-ui/react-icons";

import { formatDate, formatGenres, formatMediaType } from "@/util/format";

import { Media } from "@/types/anime";
import LoginWrapper from "@/ui/LoginWrapper";
import Image from "next/image";
import Modal from "../../Modal";
import AddToListForm from "./Modal/AddToListForm";

const ListType = ({ anime, index }: { anime: Media; index: number }) => {
  const { isSignedIn } = useUser();

  const animeEpisodes = () =>
    anime?.episodes ? `${anime?.episodes > 1 ? `${anime?.episodes} eps` : "1 episode"}` : `Ongoing`;

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
      className="flex items-center mb-4 w-full"
      tabIndex={0}
      // onMouseEnter={() => {
      //   handleMouseEnter(anime.id);
      // }}
      // onMouseLeave={handleMouseLeave}
    >
      <span
        className="w-fit mr-4 font-bold text-xl"
        style={{ color: "#8ba0b2" }}
      >
        #{index + 1}
      </span>
      <Link href={`/anime-details/${anime?.id}`} className="flex w-full">
        <table className="w-full bg-white rounded-md shadow-box  shadow-custom">
          <tbody className="text-slate-800">
            <tr>
              <td className="w-1/6 lg:w-[10%] p-4">
                <Image
                  width={50}
                  height={62}
                  className="w-20 h-28 object-cover"
                  src={anime?.coverImage?.large || ""}
                  alt={anime?.title?.english || anime?.title?.native ||"Anime Cover"}
                />
              </td>
              <td className="w-1/3 lg:w-1/2 pr-2 lg:pr-0">
                <h3 className="font-semibold text-lg">
                {anime?.title?.english || anime?.title?.native}
                </h3>
                <p className="text-sm">{formatGenres(anime?.genres)}</p>
              </td>
              <td className="w-1/6 lg:w-[12.3%]">
                <p>{`${anime?.averageScore}%`}</p>
                <p className="text-sm">{`${
                  anime?.popularity && anime?.popularity.toLocaleString()
                } users`}</p>
              </td>
              <td className="w-1/6 lg:w-[12.3%]">
                <p>{formatMediaType(anime?.format)}</p>
                <p className="text-sm">{animeEpisodes()}</p>
              </td>
              <td className="w-1/6 lg:w-[15.3%] text-right pr-4">
                <span className="">
                  {formatDate(
                    anime?.endDate || anime?.startDate,
                    "seasonYear"
                  ) || "N/A"}
                </span>
                <br /> {""}
                {anime?.status === "RELEASING" && anime?.nextAiringEpisode ? (
                  <span className="text-sm text-gray-500">
                    Ep {anime?.nextAiringEpisode?.episode} airing in{" "}
                    {Math.floor(
                      anime?.nextAiringEpisode?.timeUntilAiring / 86400
                    )}{" "}
                    days
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">{anime?.status}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Link>
      <div className="flex items-center">
        {isSignedInAddToListButton()}
        <Modal id="add_to_list_modal">
          <AddToListForm />
        </Modal>
      </div>
    </li>
  );
};

export default ListType;