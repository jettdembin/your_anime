"use client";

import { ToastContainer } from "react-toastify";

import { useAnimeDetails } from "@/graphql/queries";

import Hero from "@/app/anime-details/[id]/components/Hero";
import AnimeDetailsContent from "./AnimeDetailsContent";

type Props = {};

export const Main = ({
  params,
}: {
  params: { id: string; userId: string };
}) => {
  const { error, loading, data } = useAnimeDetails(params.id);

  const anime = data?.Media || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <header>
        <Hero anime={anime} />
      </header>
      <div className="bg-slate-200">
        <main className="container mx-auto py-6">
          <AnimeDetailsContent anime={anime} />
        </main>
      </div>
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
    </>
  );
};