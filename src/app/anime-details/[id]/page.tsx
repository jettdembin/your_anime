"use client";

import { useRef, useEffect } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { GET_ANIME_DETAILS, useAnimeDetails } from "@/src/graphql/queries";

const AnimeDetails = ({ params }: { params: { id: string } }) => {
  const animeDescriptionRef = useRef(null);

  const { error, loading, data } = useAnimeDetails(params.id);
  const anime = data?.Media;

 

  const handleAddToLikes = async () => {
    // Assuming you have the anime's GraphQL ID available as animeId.
    const likeData = {
      animeId: params.id, // Pass the GraphQL ID of the anime.
      animeTitle: anime.title.english,
    };
    // Show a pending toast first.
    const toastId = toast("Adding your like...", {
      autoClose: false,
    });
  
    axios
      .post("/api/postLike", likeData)
      .then((response) => {
        // Close the pending toast.
        toast.dismiss(toastId);
        
        // Show success toast.
        toast.success("Like added successfully!");
      })
      .catch((error) => {
        // Close the pending toast.
        toast.dismiss(toastId);
        
        let errorMessage = "Failed to add like";
        
        // If the API returned a custom error message, use it.
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        
        // Show error toast with either default or custom message.
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    if (data && !!animeDescriptionRef?.current) {
      animeDescriptionRef.current.innerHTML = anime.description;
    }
  }, [data?.Media, anime?.description, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Define the Hero component
  const hero = (
    <div className="header-wrap relative bg-slate-50">
      <div
        className="banner w-full h-[400px] -mt-12 relative"
        style={{
          background: `url(${anime.bannerImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 35%",
        }}
      >
        <div
          className="absolute inset-0 bg-opacity-50 bg-black shadow-inner"
          style={{
            background:
              "linear-gradient(180deg,rgba(10, 10, 10, 0) 40%,rgba(10, 10, 10, 0.6))",
          }}
        ></div>
      </div>
      <div className="header">
        <div
          className="container grid gap-7 max-w-6xl px-12"
          style={{ gridTemplateColumns: "270px auto" }}
        >
          <div className="relative -mt-32">
            <div className="static shadow-lg">
              <img
                className="w-full object-cover rounded-sm"
                src={anime.coverImage.extraLarge}
                alt={anime.title.english}
              />
            </div>
            <div
              className="grid my-5 gap-4"
              style={{ gridTemplateColumns: "auto 35px" }}
            >
              <button className="py-2 bg-blue-200 rounded-sm">
                Add to List
              </button>
              <button
                className="py-2 bg-red-400 rounded-sm text-white"
                onClick={handleAddToLikes}
              >
                ♥
              </button>
            </div>
          </div>

          <div className="pt-6 pb-4">
            <h2 className="text-3xl mb-2">{anime.title.english}</h2>
            <p className="text-gray-700" ref={animeDescriptionRef}></p>
          </div>
        </div>
      </div>
    </div>
  );

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
        <li>
          <h6>Format</h6>
          <p className="text-sm text-slate-700">{anime.format}</p>
        </li>
        <li>
          <h6>Episode Duration</h6>
          <p className="text-sm text-slate-700">{anime.duration}</p>
        </li>
        <li>
          <h6>Status</h6>
          <p className="text-sm text-slate-700">{anime.status}</p>
        </li>
        <li>
          <h6>Start Date</h6>
          <p className="text-sm text-slate-700">{anime.startDate.year}</p>
        </li>
        <li>
          <h6>Season</h6>
          <p className="text-sm text-slate-700">{anime.season}</p>
        </li>
        <li>
          <h6>Average Score</h6>
          <p className="text-sm text-slate-700">{anime.averageScore}</p>
        </li>
        <li>
          <h6>Mean Score</h6>
          <p className="text-sm text-slate-700">{anime.meanScore}</p>
        </li>
        <li>
          <h6>Popularity</h6>
          <p className="text-sm text-slate-700">{anime.popularity}</p>
        </li>
        <li>
          <h6>Favorites</h6>
          <p className="text-sm text-slate-700">{anime.favourites}</p>
        </li>
        <li>
          <h6>Studios</h6>
          <p className="text-sm text-slate-700">{anime.studios?.nodes?.name}</p>
        </li>
        <li>
          <h6>Producers</h6>
          <p className="text-sm text-slate-700">{anime.format}</p>
        </li>
        <li>
          <h6>Source</h6>
          <p className="text-sm text-slate-700">{anime.source}</p>
        </li>
        <li>
          <h6>Hashtag</h6>
          <p className="text-sm text-slate-700">{anime.hashtag}</p>
        </li>
        <li>
          <h6>Genres</h6>
          <p className="text-sm text-slate-700">{anime.genres.join(", ")}</p>
        </li>
        <li>
          <h6>Romaji</h6>
          <p className="text-sm text-slate-700">{anime.title.romaji}</p>
        </li>
        <li>
          <h6>English</h6>
          <p className="text-sm text-slate-700">{anime.title.english}</p>
        </li>
        <li>
          <h6>Native</h6>
          <p className="text-sm text-slate-700">{anime.title.native}</p>
        </li>
        <li>
          <h6>Synonyms</h6>
          <p className="text-sm text-slate-700">{anime.synonyms}</p>
        </li>
      </ul>
    </div>
  );

  const tags = (
    <div className="py-6">
      <h6>Tags</h6>
      <div className="relative space-y-4 pt-4">
        {anime.tags.map((tag) => (
          <div key={tag.name} className="px-3 py-2 bg-white rounded-sm">
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <main>
        <section>{hero}</section>
        <section
          className="px-12 grid gap-10"
          style={{ gridTemplateColumns: "270px auto" }}
        >
          <section>
            {animeRating}
            {animePopularity}
            {animeInfo}
            {tags}
          </section>
          <section>
            <div>stuff</div>
          </section>
        </section>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
       
      </main>
    </div>
  );
};

export default AnimeDetails;
