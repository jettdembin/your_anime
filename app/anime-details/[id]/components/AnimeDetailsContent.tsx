import Characters from "./AnimeDetailsContent/Characters";
import Relations from "./AnimeDetailsContent/Relations";

type Props = {
  anime: any;
};

export default function AnimeDetailsContent({ anime }: Props) {
  const animeRating = (
    <div className="md:w-full mb-4">
      <div className="bg-white shadow-md  p-2">
        <h6 className="text-sm text-slate-800 w-max mx-auto lg:mx-0">
          ⭐ #{anime.averageScore} Highest Rated All Time
        </h6>
      </div>
    </div>
  );

  const animePopularity = (
    <div className="md:w-full mb-4">
      <div className="flex items-center bg-white shadow-md p-2">
        <h6 className="text-sm text-slate-800 mx-auto lg:mx-0">
          💖 #{anime.popularity} <span>Most Popular All Time</span>
        </h6>
      </div>
    </div>
  );

  const animeInfo = (
    <div className="">
      <ul className="overflow-x-auto flex gap-6 lg:gap-0 lg:flex-col lg:space-y-4 rounded-sm bg-white shadow-md p-4">
        {anime.format && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Format
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.format}</span>
            </div>
          </li>
        )}
        {anime.duration && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Episode Duration
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.duration}</span>
            </div>
          </li>
        )}
        {anime.status && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Status
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.status}</span>
            </div>
          </li>
        )}
        {anime.startDate.year && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Start Date
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span></span>
              {anime.startDate.year}
            </div>
          </li>
        )}
        {anime.season && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Season
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.season}</span>
            </div>
          </li>
        )}
        {anime.averageScore && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Average Score
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.averageScore}</span>
            </div>
          </li>
        )}
        {anime.meanScore && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Mean Score
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.meanScore}</span>
            </div>
          </li>
        )}
        {anime.popularity && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Popularity
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.popularity}</span>
            </div>
          </li>
        )}
        {anime.favourites && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Favorites
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.favourites}</span>
            </div>
          </li>
        )}
        {anime.studios?.nodes?.name && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Studios
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span> {anime.studios?.nodes?.name}</span>
            </div>
          </li>
        )}
        {anime.producers && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Producers
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.producers}</span>
            </div>
          </li>
        )}
        {anime.source && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Source
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.source}</span>
            </div>
          </li>
        )}
        {anime.hashtag && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Hashtag
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.hashtag}</span>
            </div>
          </li>
        )}
        {anime.genres && anime.genres.length > 0 && (
          <li className="flex flex-col justify-between gap-2">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Genres
            </h6>
            <div className="text-xs text-slate-500 w-max flex-wrap">
              {anime.genres.map((genre: string, index: number) => (
                <span key={genre + index}>
                  {genre}
                  {index < anime.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </li>
        )}

        {anime.title.romaji && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Romaji
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.title.romaji}</span>
            </div>
          </li>
        )}
        {anime.title.english && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              English
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.title.english}</span>
            </div>
          </li>
        )}
        {anime.title.native && (
          <li className="flex flex-col  gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Native
            </h6>
            <div className="text-xs text-slate-500 w-max">
              <span>{anime.title.native}</span>
            </div>
          </li>
        )}
        {anime.synonyms && anime.synonyms.length > 0 && (
          <li className="flex flex-col gap-2 lg:gap-0 justify-between lg:justify-normal">
            <h6 className="mb-1 text-sm font-semibold text-slate-600 w-max">
              Synonyms
            </h6>
            <div className="text-xs text-slate-500 flex flex-wrap gap-1">
              {anime.synonyms.map((synonym: string, index: number) => (
                <span key={synonym + index}>
                  {synonym}
                  {index < anime.synonyms.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </li>
        )}
      </ul>
    </div>
  );

  const animeTags = (
    <div className="py-6">
      <h6 className="font-semibold text-sm text-slate-600 w-max">Tags</h6>
      <div className="text-slate-800 relative space-y-4 pt-4">
        {anime?.tags?.map((tag: { name: string; rank: string }, i: number) => (
          <div
            key={tag.name + i}
            className="px-3 py-2 shadow-md bg-white rounded-sm flex justify-between"
          >
            <p className="text-sm">{tag.name}</p>
            <p className="text-sm text-slate-400">{tag.rank}%</p>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-[270px_auto] gap-10">
        <aside className="order-2 lg:order-1">
          <div className="hidden lg:block">
            {animeRating}
            {animePopularity}
            {animeInfo}
            <div className="hidden lg:block">{animeTags}</div>
          </div>
        </aside>

        <div className="order-1 lg:order-2">
          <div className="block md:flex md:gap-4 lg:hidden">
            {animeRating}
            {animePopularity}
          </div>
          <Relations relations={anime?.relations?.nodes} anime={anime} />
          <Characters characters={anime?.characters?.edges} anime={anime} />
          <div className="block lg:hidden">{animeTags}</div>
        </div>
      </div>
    </>
  );
}
