"use client";

import { GET_TOP_100_ANIME } from "@/graphql/queries";

import { useAnilistAPI } from "@/hooks/useAnilistAPI";

import { CardTypeProvider } from "@/components/Pages/Discover/context/CardTypeContext";

import AnimeCard from "@/components//ui/AnimeCard";
import { CardSectionLoader } from "@/components/ui/LoadingSection";
import { AnimeCardLayout } from "@/components/Layout/AnimeCardLayout";

export default function TopAnimeList() {
  const { error, loading, data } = useAnilistAPI(GET_TOP_100_ANIME);

  if (loading) return <CardSectionLoader />;
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <CardTypeProvider type="list">
      <div className="max-w-7xl mx-auto">
        <AnimeCardLayout>
          <ul>
            {data.Page.media.slice(0, 10).map((anime: any, index: number) => (
              <AnimeCard key={anime.id} media={anime} index={index} />
            ))}
          </ul>
        </AnimeCardLayout>
      </div>
    </CardTypeProvider>
  );
}
