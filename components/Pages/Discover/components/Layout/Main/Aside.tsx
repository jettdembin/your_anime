import React from "react";
import Tags from "./Aside/ui/Tags";

type Props = {};

export default function Aside({ tags, anime }: Props) {
  const animeRating = (
    <div className="mb-4">
      <div className="bg-white shadow-sm p-4">
        <h6>⭐#{anime.averageScore} Highest Rated All Time</h6>
      </div>
    </div>
  );

  const animePopularity = (
    <div className="mb-4">
      <div className="flex items-center bg-white shadow-sm p-4">
        <h6 className="">
          💖 #{anime.popularity} <span>Most Popular All Time</span>
        </h6>
      </div>
    </div>
  );

  const animeInfo = (
    <div className="">
      <ul className="flex flex-col space-y-4 rounded-md bg-white shadow-sm p-4">
        {anime.format && (
          <li>
            <h6>Format</h6>
            <p className="text-sm text-slate-700">{anime.format}</p>
          </li>
        )}
        {anime.duration && (
          <li>
            <h6>Episode Duration</h6>
            <p className="text-sm text-slate-700">{anime.duration}</p>
          </li>
        )}
        {anime.status && (
          <li>
            <h6>Status</h6>
            <p className="text-sm text-slate-700">{anime.status}</p>
          </li>
        )}
        {anime.startDate.year && (
          <li>
            <h6>Start Date</h6>
            <p className="text-sm text-slate-700">{anime.startDate.year}</p>
          </li>
        )}
        {anime.season && (
          <li>
            <h6>Season</h6>
            <p className="text-sm text-slate-700">{anime.season}</p>
          </li>
        )}
        {anime.averageScore && (
          <li>
            <h6>Average Score</h6>
            <p className="text-sm text-slate-700">{anime.averageScore}</p>
          </li>
        )}
        {anime.meanScore && (
          <li>
            <h6>Mean Score</h6>
            <p className="text-sm text-slate-700">{anime.meanScore}</p>
          </li>
        )}
        {anime.popularity && (
          <li>
            <h6>Popularity</h6>
            <p className="text-sm text-slate-700">{anime.popularity}</p>
          </li>
        )}
        {anime.favourites && (
          <li>
            <h6>Favorites</h6>
            <p className="text-sm text-slate-700">{anime.favourites}</p>
          </li>
        )}
        {anime.studios?.nodes?.name && (
          <li>
            <h6>Studios</h6>
            <p className="text-sm text-slate-700">
              {anime.studios?.nodes?.name}
            </p>
          </li>
        )}
        {anime.producers && (
          <li>
            <h6>Producers</h6>
            <p className="text-sm text-slate-700">{anime.producers}</p>
          </li>
        )}
        {anime.source && (
          <li>
            <h6>Source</h6>
            <p className="text-sm text-slate-700">{anime.source}</p>
          </li>
        )}
        {anime.hashtag && (
          <li>
            <h6>Hashtag</h6>
            <p className="text-sm text-slate-700">{anime.hashtag}</p>
          </li>
        )}
        {anime.genres && anime.genres.length > 0 && (
          <li>
            <h6>Genres</h6>
            <p className="text-sm text-slate-700">{anime.genres.join(", ")}</p>
          </li>
        )}
        {anime.title.romaji && (
          <li>
            <h6>Romaji</h6>
            <p className="text-sm text-slate-700">{anime.title.romaji}</p>
          </li>
        )}
        {anime.title.english && (
          <li>
            <h6>English</h6>
            <p className="text-sm text-slate-700">{anime.title.english}</p>
          </li>
        )}
        {anime.title.native && (
          <li>
            <h6>Native</h6>
            <p className="text-sm text-slate-700">{anime.title.native}</p>
          </li>
        )}
        {anime.synonyms && (
          <li>
            <h6>Synonyms</h6>
            <p className="text-sm text-slate-700">{anime.synonyms}</p>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <>
      {animeRating}
      {animePopularity}
      {animeInfo}
      <Tags tags={anime?.tags} />
    </>
  );
}
