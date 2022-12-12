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
      `${API_URL}/anime?filter[categories]=${category}`
    );
    const data: any = await res.json();

    console.log(data, "data being set");

    setAnime(data.data);
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
      {/* Render the data here. */}
      <select
        onChange={(e) => {
          handleAnimeCategorySelection(e.target.value);
        }}
      >
        <option>adventure</option>
        <option>fantasy</option>
        <option>mystery</option>
      </select>
      <main>
        {anime.map((anim) => {
          return (
            <h1 key={anim.attributes.canonicalTitle}>
              {anim.attributes.canonicalTitle}
            </h1>
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
