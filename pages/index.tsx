import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEventHandler,
} from "react";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// The Kitsu API endpoint for fetching data.
const API_URL: string = "https://kitsu.io/api/edge";

type Anime = {
  id: string;
  attributes: {
    canonicalTitle: string;
    popularityRank: number;
    startDate: string;
    endDate: string;
    posterImage: {
      tiny: string;
      medium: string;
    };
  };
};

const Home = ({ data }: { data: any }) => {
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

  const notify = () => toast("Added 🙌");

  const handleAddToFavorites = (anime: Anime) => {
    let filtered = new Set([...favorites, anime]);
    setFavorites(filtered);

    notify();
  };

  useEffect(() => {
    if (anime?.length === 0) return;

    console.log(anime);
  }, [anime]);

  useEffect(() => {
    console.log(data, "data from initial props");
  }, [data]);
  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <div className="p-12">
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
      <main>
        <div className="grid grid-cols-2 gap-4">
          {anime?.map((anim) => {
            return (
              <div
                key={anim.id}
                className="border bg-green-50 rounded-md shadow-md p-4 "
              >
                <h1>{anim.attributes.canonicalTitle}</h1>
                {/* <Image
                width={200}
                height={200}
                src={anim.attributes.posterImage.tiny}
                alt={`${anim.attributes.canonicalTitle} image`}
                role="presentation"
              /> */}
                <figure className="grid grid-cols-2">
                  <Image
                    width={200}
                    height={100}
                    src={anim.attributes.posterImage.medium}
                    alt={`${anim.attributes.canonicalTitle} image`}
                    role="presentation"
                  />
                  <div className="flex flex-col border border-black p-2">
                    <p>
                      <b>Rank:</b> {anim.attributes.popularityRank}{" "}
                      {anim.attributes.popularityRank < 100 && "😍"}
                    </p>
                    <p>Start: {anim.attributes.startDate}</p>
                    <p>End: {anim.attributes.endDate ?? "Airing"}</p>
                    <button
                      className="mt-auto border bg-green-400 rounded-sm border-none p-1 text-white bg-white"
                      onClick={() => {
                        handleAddToFavorites(anim);
                      }}
                    >
                      Add to Favorites ⭐
                    </button>
                  </div>
                </figure>
              </div>
            );
          })}
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
