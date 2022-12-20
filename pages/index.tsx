import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEventHandler,
} from "react";

import AnimeCard from "../components/AnimeCard";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Anime } from "../utils/models";

import { Query, QueryClient, QueryClientProvider, useQuery } from "react-query";
import { stringify } from "querystring";

// The Kitsu API endpoint for fetching data.
const API_URL: string = "https://kitsu.io/api/edge";

const Home = () => {
  const [categrory, setCategory] = useState("");

  const [search, setSearch] = useState("");
  const [anime, setAnime] = useState<Anime[] | null>(null);
  const [favorites, setFavorites] = useState<Anime[]>([]);

  const sortedRankedAnime = anime?.sort(
    (a: any, b: any) =>
      a.attributes.popularityRank - b.attributes.popularityRank
  );

  const handleSearchValue = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget?.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/anime?filter[text]=${search}`).then(
      (res) => res.json()
    );
    setAnime(res.data);
  };
  const queryClient = new QueryClient();
  const handleAnimeCategorySelection = async (category: string) => {
    const res = await fetch(
      `${API_URL}/anime?filter%5Bcategories%5D=${category}`
    ).then((res) => res.json());

    console.log(data, "data being set");

    setAnime(data.data);
  };

  const handleId = async () => {
    const res: any = await fetch(
      `https://private-anon-082fc17cbd-kitsu.apiary-mock.com/api/edge/anime/100`
    );
    const data: any = await res.json();

    console.log(data, "data being set");

    setAnime([...data.data.attributes.canonicalTitle]);
  };

  const notifyFavorites = () => toast("Added to Favorites🙌");

  const handleAddToFavorites = (anime: Anime) => {
    let filtered = new Set([...favorites, anime]);
    setFavorites(filtered);

    notifyFavorites();
  };

  useEffect(() => {
    if (anime?.length === 0) return;

    console.log(anime);
  }, [anime]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <div className="p-12" style={{ minHeight: "100%" }}>
      <header className="flex flex-col justify-center border border-red-300">
        <h1 className="mx-auto">Anime from Kitsu</h1>
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              className="pl-1"
              onChange={(e) => handleSearchValue(e)}
              value={search}
            />
            <button
              type="submit"
              className="ml-2 text-black bg-white rounded-sm border border-white-100 px-2 py-1"
            >
              Submit
            </button>
          </form>
        </div>
        {/* <select
          onChange={(e) => {
            handleAnimeCategorySelection(e.target.value);
            // handleId();
          }}
        >
          <option>adventure</option>
          <option>fantasy</option>
          <option>mystery</option>
        </select> */}
      </header>
      <main style={{ minHeight: "100%" }}>
        <div className="grid grid-cols-2 gap-4" style={{ minHeight: "100%" }}>
          <QueryClientProvider client={queryClient}>
            {anime?.map((anim) => {
              return (
                <AnimeCard
                  key={anim.id}
                  id={anim.id}
                  attributes={anim.attributes}
                  handleAddToFavorites={handleAddToFavorites}
                  search={search}
                />
              );
            })}
          </QueryClientProvider>
        </div>
      </main>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

// The `getInitialProps` function is called by Next.js to fetch data on the server side
// before rendering the component. It accepts the Next.js `ctx` object, which contains
// the request context.
Home.getInitialProps = (ctx: any) => {
  // Fetch the data from the Kitsu API.
  return fetch(`${API_URL}/anime`)
    .then((res) => res.json())
    .then((data) => {
      // Return the data as props.
      return { data };
    });
};

export default Home;
