"use client";

import { AnimeCardLayout } from "@/layout/AnimeCardLayout";
import AnimeCard from "@/ui/Card/AnimeCard";

import { useSearchParams } from "next/navigation";

type Props = {
  media: any;
  searchData: any;
};

export default function AnimeQueryResults({ media, searchData }: Props) {
  const searchParams = useSearchParams();

  const searchValue = searchParams?.get("search");
  const categoryValue = searchParams?.get("category");

  return (
    <section>
      {!searchValue ? (
        <AnimeCardLayout>
          {media.map((media: any, i: number) => (
            <AnimeCard key={i} media={media} index={i} />
          ))}
        </AnimeCardLayout>
      ) : (
        <AnimeCardLayout>
          {searchData?.Page?.media?.map((media: any, i: number) => (
            <AnimeCard key={i} media={media} index={i} />
          ))}
        </AnimeCardLayout>
      )}
    </section>
  );
}
