"use client";

import { GET_POPULAR_ANIME } from "@/graphql/queries";
import { Media } from "@/types/anime";

import { CardTypeProvider } from "@/context/CardTypeContext";

import { useAnilistAPI } from "@/hooks/useAnilistAPI";

import AnimeCard from "@/components/ui/AnimeCard";
import { CardSectionLoader } from "@/components/ui/LoadingSection";
import { AnimeCardLayout } from "@/components/Layout/AnimeCardLayout";

export default function PopularAnime() {
  const { error, loading, data } = useAnilistAPI(GET_POPULAR_ANIME);

  if (loading) return <CardSectionLoader />;
  if (error) {
    console.log(error, "error");
    return <p>Error: {error.message}</p>;
  }

  return (
    <CardTypeProvider type="descriptive">
      <AnimeCardLayout>
        {data.Page.media.slice(0, 12).map((anime: Media, i: number) => {
          return <AnimeCard key={i} media={anime} index={i} type="card" />;
        })}
      </AnimeCardLayout>
    </CardTypeProvider>
  );
}
