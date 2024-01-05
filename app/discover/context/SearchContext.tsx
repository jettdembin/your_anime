"use client";

// SearchProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  GET_POPULAR_ANIME,
  GET_TOP_100_ANIME,
  GET_TRENDING,
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
  let variables = null;

  if (!!searchValue && categoryValue?.toUpperCase() === "TRENDING") {
    query = SEARCH_ANIMES_TRENDING;
    variables = { sort: "TRENDING_DESC", search: searchValue };
  } else if (
    !!searchValue &&
    categoryValue?.toUpperCase() === "POPULAR_ANIME"
  ) {
    query = SEARCH_ANIMES_POPULAR;
    variables = { sort: "POPULARITY_DESC", search: searchValue };
    //debugger;
  } else if (!!searchValue && categoryValue?.toUpperCase() === "SCORE_DESC") {
    query = SEARCH_ANIMES_UPCOMING;
    variables = { sort: "SCORE_DESC", search: searchValue };
    //debugger;
  } else if (!!searchValue) {
    query = SEARCH_ANIMES_TRENDING;
    variables = { sort: "SCORE_DESC", search: searchValue };
    //debugger;
  } else if (categoryValue?.toUpperCase() === "POPULARITY_DESC") {
    query = GET_POPULAR_ANIME;
    variables = { sort: "SCORE_DESC", search: searchValue };
    //debugger;
  } else if (categoryValue?.toUpperCase() === "TOP_100") {
    query = GET_TOP_100_ANIME;
    variables = { sort: "SCORE_DESC", search: searchValue };
    //debugger;
  } else if (categoryValue?.toUpperCase() === "POPULAR_ANIME") {
    query = GET_POPULAR_ANIME;
    variables = { sort: "POPULARITY_DESC", search: searchValue };
    //debugger;
  } else {
    query = GET_TRENDING;
    variables = { sort: "TRENDING_DESC", search: searchValue };
    // debugger;
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
  } = useSearch({ query: queryValue, variables });
  // } = useSearch({ searchValue, categoryValue, query: queryValue, variables });

  useEffect(() => {
    setQueryValue(query);
  }, [categoryValue]);

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

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export { SearchProvider, useSearchContext };
