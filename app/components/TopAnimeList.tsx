"use client";

import { GET_TOP_100_ANIME } from "@/graphql/queries";

import { useAnilistAPI } from "@/hooks/useAnilistAPI";

import { CardTypeProvider } from "@/context/CardTypeContext";

import { AnimeCardLayout } from "@/layout/AnimeCardLayout";
import AnimeCard from "@/ui/Card/AnimeCard";
import { CardSectionLoader } from "@/ui/LoadingSection";

export default function TopAnimeList() {
  const { error, loading, data } = useAnilistAPI(GET_TOP_100_ANIME);

  if (loading) return <CardSectionLoader />;
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <CardTypeProvider type="list">
      <AnimeCardLayout>
        <ul>
          {data.Page.media.slice(0, 10).map((anime: any, index: number) => (
            <AnimeCard key={anime.id + index} media={anime} index={index} />
          ))}
        </ul>
      </AnimeCardLayout>
    </CardTypeProvider>
  );
}
