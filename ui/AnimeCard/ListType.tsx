"use client";

import { useRouter } from "next/navigation";

import { formatDate, formatGenres, formatMediaType } from "@/util/format";

import { useShowAnimeInfo } from "@/hooks/useShowAnimeInfo";

import AnimeCard from "../AnimeCard";

const ListType = ({ anime, index, like }) => {
  const router = useRouter();

  const { handleMouseEnter, handleMouseLeave } = useShowAnimeInfo();

  if (!!like?.id) {
    return <AnimeCard like={like} index={index} />;
  }
  return (
    <li
      key={anime?.id}
      className="flex items-center mb-4 w-full"
      role="button"
      tabIndex={0}
      onMouseEnter={() => {
        handleMouseEnter(anime.id);
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        router.push(`/anime-details/${anime.id}`);
      }}
    >
      <span
        className="w-fit mr-4 font-bold text-xl"
        style={{ color: "#8ba0b2" }}
      >
        #{index + 1}
      </span>
      <table className="w-full bg-white rounded-md shadow-box  shadow-custom">
        <tbody className="text-slate-800">
          <tr>
            <td className="w-1/6 lg:w-[10%] p-4">
              <img
                className="w-20 h-28 object-cover"
                src={anime?.coverImage?.medium}
                alt={anime?.title?.english || "Anime Cover"}
              />
            </td>
            <td className="w-1/3 lg:w-1/2 pr-2 lg:pr-0">
              <h3 className="font-semibold text-lg">{anime?.title.english}</h3>
              <p className="text-sm">{formatGenres(anime?.genres)}</p>
            </td>
            <td className="w-1/6 lg:w-[13.3%]">
              <p>{`${anime?.averageScore}%`}</p>
              <p className="text-sm">{`${anime?.popularity} users`}</p>
            </td>
            <td className="w-1/6 lg:w-[13.3%]">
              <p>{formatMediaType(anime?.format)}</p>
              <p className="text-sm">{`${anime?.episodes} eps`}</p>
            </td>
            <td className="w-1/6 lg:w-[13.3%]">
              <span>
                {formatDate(anime?.endDate || anime?.startDate, "seasonYear") ||
                  "N/A"}
              </span>
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
    </li>
  );
};

export default ListType;
