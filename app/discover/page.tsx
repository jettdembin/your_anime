"use client";

import { useEffect, useState } from "react";

import { BoxIcon, DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";

import { Media } from "@/types/anime";
import { debounce } from "@/util";

import { useViewAll } from "@/app/discover/hooks/useViewAll";
import { useSearchParams } from "next/navigation";
import { useSearchContext } from "./context/SearchContext";

import { CardTypeProvider } from "@/context/CardTypeContext";

import CategoryWidget from "@/app/discover/ui/CategoryWidget";
import FilterWidget from "@/app/discover/ui/FilterWidget";
import { AnimeCardLayout } from "@/layout/AnimeCardLayout";
import AnimeCard from "@/ui/Card/AnimeCard";
import CardTypeWidgetWrapper from "@/ui/Card/AnimeCard/CardTypeWidget/CardTypeWidgetWrapper";
import { CardSectionLoader } from "@/ui/LoadingSection";

export default function Discover() {
  const searchParams = useSearchParams();

  // const type = searchParams?.get("page");
  const searchValue = searchParams?.get("search");
  const categoryValue = searchParams?.get("category");
  // const isTrending = searchParams?.get("page") === "trending";

  const [page, setPage] = useState(1);
  const [media, setMedia] = useState<Media[]>([]);

  const { error, loading, data } = useViewAll(1, 50); // Updated to accept page as a parameter
  const { data: searchData }: { data: { Page: { media: Media[] } } } =
    useSearchContext();

  useEffect(() => {
    if (data && data.Page && data.Page.media) {
      // if (data && data.Trending && data.Trending.media) {
      setMedia((prevMedia) => [...prevMedia, ...data.Page.media]);
      // setMedia((prevMedia) => [...prevMedia, ...data.Trending.media]);
    }
  }, [data]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1000
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 300);

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

  const cardType = () =>
    categoryValue?.toUpperCase() === "TOP_100" ? "list" : "descriptive";
  return (
    <CardTypeProvider type={cardType()}>
      <section>
        <header className="flex justify-between items-center w-full pb-2">
          <div className="flex w-full items-center justify-between">
            {!!searchValue && <FilterWidget />}
            <CategoryWidget />
          </div>
          <hr className="h-10 mx-2 border-x border-y border-gray-800" />
          <div className="flex gap-2 pr-8">
            <CardTypeWidgetWrapper cardType="card">
              <BoxIcon className="w-5 h-5" />
            </CardTypeWidgetWrapper>
            <CardTypeWidgetWrapper cardType="descriptive">
              <DashboardIcon className="w-5 h-5" />
            </CardTypeWidgetWrapper>
            <CardTypeWidgetWrapper cardType="list">
              <ListBulletIcon className="w-5 h-5" />
            </CardTypeWidgetWrapper>
          </div>
        </header>
        {!searchValue ? (
          <AnimeCardLayout>
            {media.map((media, i) => (
              <AnimeCard key={i} media={media} index={i} />
            ))}
          </AnimeCardLayout>
        ) : (
          <AnimeCardLayout>
            {searchData?.Page?.media?.map((media, i) => (
              <AnimeCard key={i} media={media} index={i} />
            ))}
          </AnimeCardLayout>
        )}
      </section>
    </CardTypeProvider>
  );
}
