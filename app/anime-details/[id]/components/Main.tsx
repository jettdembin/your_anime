"use client";

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

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div>
          <img src="/loading-anime-dance.gif" alt="Loading" />
          <div className="flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      </div>

      // <header>
      //   <Hero anime={anime} params={params} />
      // </header>
    );

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
    </SearchProvider>
  );
};
