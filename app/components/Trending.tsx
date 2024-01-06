"use client";

import { GET_TRENDING } from "@/graphql/queries";
import { Media } from "@/types/anime";

import { useAnilistAPI } from "@/hooks/useAnilistAPI";

import { CardTypeProvider } from "@/context/CardTypeContext";

import { AnimeCardLayout } from "@/layout/AnimeCardLayout";
import AnimeCard from "@/ui/Card/AnimeCard";
import { CardSectionLoader } from "@/ui/LoadingSection";

export default function Trending({}) {
  const { error, loading, data } = useAnilistAPI(GET_TRENDING);

  if (loading) return <CardSectionLoader />;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <CardTypeProvider type="descriptive">
      <AnimeCardLayout>
        {data.Page.media.slice(0, 8)?.map((media: Media, i: number) => (
          <AnimeCard key={media?.id + i} media={media} index={i} />
        ))}
      </AnimeCardLayout>
    </CardTypeProvider>
  );
}
