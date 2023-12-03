"use client";

import { GET_TRENDING } from "@/graphql/queries";
import { Media } from "@/types/anime";

import { useAnilistAPI } from "@/hooks/useAnilistAPI";

import { CardTypeProvider } from "@/components/Pages/Discover/context/CardTypeContext";

import { CardSectionLoader } from "@/components/ui/LoadingSection";
import { AnimeCardLayout } from "@/components/Layout/AnimeCardLayout";
import AnimeCard from "@/components/ui/AnimeCard";

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
          <AnimeCard key={i} media={media} />
        ))}
      </AnimeCardLayout>
    </CardTypeProvider>
  );
}
