"use client";

import { ToastContainer } from "react-toastify";

import { useAnimeDetails } from "@/graphql/queries";

import { Media } from "@/types/anime";

import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/app/discover/context/SearchContext";

import Hero from "@/app/anime-details/[id]/components/Hero";
import AnimeDetailsContent from "./AnimeDetailsContent";

type Props = {};

type Type = {
  type?: "ANIME" | "MANGA";
};

export const Main = ({
  params,
}: {
  params: { id: string; userId: string };
}) => {
  const search = useSearchParams() || null;
  const type: any = search?.get("type") || "ANIME";
  const { error, loading, data } = useAnimeDetails(Number(params?.id), type);

  const anime: Media = data?.Media || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <SearchProvider>
      <header>
        <Hero anime={anime} params={params} />
      </header>
      <div className="bg-slate-[#EDF1F5] px-2 sm:px-4">
        <main className="container max-w-5xl mx-auto py-6">
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
    </SearchProvider>
  );
};
