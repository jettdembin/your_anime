import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

("use client");

const Home: NextPage = () => {
  const url = "https://kitsu.io/api/edge/anime?filter[text]=naruto";

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.api+json");
  myHeaders.append("Content-Type", "application/vnd.api+json");

  let req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });
  const start = async () => {
    return await fetch(req).then((res) => res.json());
  };
  useEffect(() => {
    let ignore = false;
    if (ignore) return;

    start();
  }, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default Home;

export const getServerSideProps = async () => {
  const url = "https://kitsu.io/api/edge/anime?filter[text]=naruto";

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.api+json");
  myHeaders.append("Content-Type", "application/vnd.api+json");

  let req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  // Fetch data from external API
  const res = await fetch(req);
  const data = await res.json();

  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  // })
  //   .then((res) => res)
  //   .catch((error) => console.log(error.message))

  // const [
  //   netflixOriginals,
  //   trendingNow,
  //   topRated,
  //   actionMovies,
  //   comedyMovies,
  //   horrorMovies,
  //   romanceMovies,
  //   documentaries,
  // ] = await Promise.all([
  //   fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
  //   fetch(requests.fetchTrending).then((res) => res.json()),
  //   fetch(requests.fetchTopRated).then((res) => res.json()),
  //   fetch(requests.fetchActionMovies).then((res) => res.json()),
  //   fetch(requests.fetchComedyMovies).then((res) => res.json()),
  //   fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  //   fetch(requests.fetchRomanceMovies).then((res) => res.json()),
  //   fetch(requests.fetchDocumentaries).then((res) => res.json()),
  // ])

  return {
    props: {
      data,
    },
  };
};
