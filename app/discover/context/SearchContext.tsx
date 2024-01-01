"use client";

// SearchProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  GET_POPULAR_ANIME,
  GET_TOP_100_ANIME,
  SEARCH_ANIMES_POPULAR,
  SEARCH_ANIMES_TRENDING,
  SEARCH_ANIMES_UPCOMING,
} from "@/graphql/queries";
import { useSearchParams } from "next/navigation";
import useSearch from "../hooks/useSearch";

type CardType = {};
interface CardTypeProviderProps {
  children: React.ReactNode;
}

const SearchContext = createContext<any>(null);

const SearchProvider: React.FC<CardTypeProviderProps> = ({ children }) => {
  const searchParams = useSearchParams();

  const searchValue = searchParams?.get("search") || "";
  const categoryValue = searchParams?.get("category") || "";

  let query: any;
  if (!!searchValue && categoryValue?.toUpperCase() === "TRENDING_DESC") {
    query = SEARCH_ANIMES_TRENDING;
  } else if (
    !!searchValue &&
    categoryValue?.toUpperCase() === "POPULARITY_DESC"
  ) {
    query = SEARCH_ANIMES_POPULAR;
  } else if (!!searchValue && categoryValue?.toUpperCase() === "SCORE_DESC") {
    query = SEARCH_ANIMES_UPCOMING;
  } else if (!!searchValue) {
    query = SEARCH_ANIMES_TRENDING;
  } else if (categoryValue?.toUpperCase() === "POPULARITY_DESC") {
    query = GET_POPULAR_ANIME;
  } else if (categoryValue?.toUpperCase() === "TOP_100") {
    query = GET_TOP_100_ANIME;
  } else if (categoryValue?.toUpperCase() === "POPULAR_ANIME") {
    query = GET_POPULAR_ANIME;
  }

  const [queryValue, setQueryValue] = useState(query);

  const {
    category,
    categories,
    handleCategory,
    handleSearch,
    setSearchValues,
    searchValues,
    error,
    loading,
    data,
  } = useSearch({ searchValue, categoryValue, query: queryValue });

  useEffect(() => {
    setQueryValue(query);
  }, [searchValue, query, categoryValue]);

  return (
    <SearchContext.Provider
      value={{
        category,
        categories,
        handleCategory,
        handleSearch,
        setSearchValues,
        searchValues,
        error,
        loading,
        data,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export { SearchProvider, useSearchContext };
