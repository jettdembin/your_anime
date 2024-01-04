"use client";

import { BoxIcon, DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Media } from "@/types/anime";

import { debounce } from "@/util";

import { useSearchParams } from "next/navigation";
import { useViewAll } from "../hooks/useViewAll";

import { CardTypeProvider } from "@/context/CardTypeContext";

import CategoryWidget from "@/app/discover/ui/CategoryWidget";
import FilterWidget from "@/app/discover/ui/FilterWidget";
import CardTypeWidgetWrapper from "@/ui/Card/AnimeCard/CardTypeWidget/CardTypeWidgetWrapper";
import { CardSectionLoader } from "@/ui/LoadingSection";
import AnimeQueryResults from "./Main/AnimeQueryResults";

type Props = {};

export default function Main({}: Props) {
  const [page, setPage] = useState(1);
  const [media, setMedia] = useState<Media[]>([]);

  const { error, loading, data } = useViewAll(1, 50);

  const searchParams = useSearchParams();

  const searchValue = searchParams?.get("search");
  console.log("searchValue", searchValue);
  const categoryValue = searchParams?.get("category");

  const cardType = () =>
    categoryValue?.toUpperCase() === "TOP_100" ? "list" : "descriptive";

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

  useEffect(() => {
    if (data && data.Page && data.Page.media) {
      setMedia(data.Page.media || []);
    }
  }, [data]);

  const animeResults = () => (searchValue ? media : data?.Page.media);
  console.log("animeResults", animeResults());

  if (loading) return <CardSectionLoader />;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) return null;

  return (
    <CardTypeProvider type={cardType()}>
      <header className="flex justify-between items-center w-full pb-2">
        <div className="flex w-full items-center justify-between">
          {!!searchValue && <FilterWidget />}
          <CategoryWidget />{" "}
        </div>
        <hr className="h-10 mx-2 border-x border-y border-gray-800" />
        <div className="flex gap-2">
          <CardTypeWidgetWrapper cardType="card">
            <BoxIcon className="w-4 h-4" />
          </CardTypeWidgetWrapper>
          <CardTypeWidgetWrapper cardType="descriptive">
            <DashboardIcon className="w-4 h-4" />
          </CardTypeWidgetWrapper>
          <CardTypeWidgetWrapper cardType="list">
            <ListBulletIcon className="w-4 h-4" />
          </CardTypeWidgetWrapper>
        </div>
      </header>

      <AnimeQueryResults media={animeResults()} />
    </CardTypeProvider>
  );
}
