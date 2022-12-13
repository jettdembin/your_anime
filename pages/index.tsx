import React, { useState, useEffect } from "react";

// The Kitsu API endpoint for fetching data.
const API_URL: string = "https://kitsu.io/api/edge";

interface Category {
  category: string;
}

const Home = ({ data }: { data: any }) => {
  const [categrory, setCategory] = useState<string>("");
  const [anime, setAnime] = useState<any[]>([]);

  const handleAnimeCategorySelection = async (category: string) => {
    const res: any = await fetch(
      `${API_URL}/anime?filter%5Bcategories%5D=${category}`
    );
    const data: any = await res.json();

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

  useEffect(() => {
    if (anime.length === 0) return;

    console.log(anime);
  }, [anime]);

  useEffect(() => {
    console.log(data, "data from initial props");
  }, [data]);

  return (
    <div>
      <h1>Anime from Kitsu</h1>
      <select
        onChange={(e) => {
          handleAnimeCategorySelection(e.target.value);
          // handleId();
        }}
      >
        <option>adventure</option>
        <option>fantasy</option>
        <option>mystery</option>
      </select>
      <main>
        {anime?.map((anim) => {
          return (
            <>
              <h1 key={anim.id}>{anim.attributes.canonicalTitle}</h1>
              <img src={anim.attributes.posterImage.tiny} />
            </>
          );
        })}
      </main>
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
