"use client";

import { useEffect, useState, useCallback } from "react";

import { debounce } from "@/components/Pages/Discover/utils";

import { useSearchParams } from "next/navigation";
import { useViewAll } from "@/components/Pages/Discover/hooks/useViewAll";
import { useCardTypeContext } from "@/components/Pages/Discover/context/CardTypeContext";
import { useSearchContext } from "@/components/Pages/Discover/context/SearchContext";

import { AnimeCardLayout } from "@/components/Layout/AnimeCardLayout";
import { CardSectionLoader } from "@/components/ui/LoadingSection";
import FilterWidget from "@/components/Pages/Discover/components/ui/FilterWidget";
import CategoryWidget from "@/components/Pages/Discover/components/ui/CategoryWidget";
import CardWidget from "@/components/Pages/Discover/components/ui/CardTypeWidget/Widget";
import AnimeCardOld from "@/components/Pages/Home/components/ui/AnimeCardOld";

export default function Discover() {
  const searchParams = useSearchParams();

  // const type = searchParams?.get("page");
  const searchValue = searchParams?.get("search");
  const categoryValue = searchParams?.get("category");
  // const isTrending = searchParams?.get("page") === "trending";

  const [page, setPage] = useState(1);
  const [media, setMedia] = useState([]);

  const { cardType } = useCardTypeContext();

  const { error, loading, data } = useViewAll(1, 50); // Updated to accept page as a parameter
  const { data: searchData } = useSearchContext();

  useEffect(() => {
    if (data && data.Page && data.Page.media) {
      // if (data && data.Trending && data.Trending.media) {
      setMedia((prevMedia) => [...prevMedia, ...data.Page.media]);
      // setMedia((prevMedia) => [...prevMedia, ...data.Trending.media]);
    }
  }, [data]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 300),
    []
  ); // 300ms delay

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, handleScroll]);

  if (loading) return <CardSectionLoader />;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) return;
  return (
    <section>
      <header className="flex justify-between items-center w-full pb-2">
        <div className="flex w-full items-center justify-between">
          {!!searchValue && <FilterWidget />}
          <CategoryWidget />
        </div>
        <hr className="h-10 mx-2 border-x border-y border-gray-800" />
        <div className="flex gap-1">
          <CardWidget cardType="card" />
          <CardWidget cardType="descriptive" />
          <CardWidget cardType="list" />
        </div>
      </header>
      {!searchValue ? (
        <AnimeCardLayout>
          {media.map((mediaItem, i) => (
            <AnimeCardOld
              key={i}
              media={mediaItem}
              index={i}
              cardType={cardType}
            />
          ))}
        </AnimeCardLayout>
      ) : (
        <AnimeCardLayout>
          {searchData?.Page?.media?.map((media, i) => (
            <AnimeCardOld key={i} media={media} cardType={cardType} index={i} />
          ))}
        </AnimeCardLayout>
      )}
    </section>
  );
}
