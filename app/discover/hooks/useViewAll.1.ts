"use client";
import {
    GET_POPULAR_ANIME,
    GET_TOP_100_ANIME,
    GET_TRENDING,
    SEARCH_ANIMES_POPULAR,
    SEARCH_ANIMES_TRENDING,
    SEARCH_ANIMES_UPCOMING
} from "@/graphql/queries";
import { useAnilistAPI } from "@/hooks/useAnilistAPI";
import { useSearchParams } from "next/navigation";

//SEARCH_ANIMES_TRENDING variables
// $sort: [MediaSort] =  # $status: String # $season: String # $year: Int
const useViewAll = (page: number, perPage: number) => {
  const searchParams = useSearchParams();

  const searchValue = searchParams?.get("search") || "";
  const categoryValue = searchParams?.get("category") || "";

  let query;
  let variables;

  if (!!searchValue && categoryValue?.toUpperCase() === "TRENDING") {
    query = SEARCH_ANIMES_TRENDING;
    variables = { sort: "TRENDING_DESC", search: searchValue };
  } else if (!!searchValue &&
    categoryValue?.toUpperCase() === "POPULAR_ANIME") {
    query = SEARCH_ANIMES_POPULAR;
    variables = { sort: "TRENDING_DESC", search: searchValue };
    //debugger;
  } else if (!!searchValue && categoryValue?.toUpperCase() === "SCORE_DESC") {
    query = SEARCH_ANIMES_UPCOMING;
    //debugger;
  } else if (!!searchValue) {
    query = SEARCH_ANIMES_TRENDING;
    //debugger;
  } else if (categoryValue?.toUpperCase() === "POPULARITY_DESC") {
    query = GET_POPULAR_ANIME;
    //debugger;
  } else if (categoryValue?.toUpperCase() === "TOP_100") {
    query = GET_TOP_100_ANIME;
    //debugger;
  } else if (categoryValue?.toUpperCase() === "POPULAR_ANIME") {
    query = GET_POPULAR_ANIME;
    //debugger;
  } else {
    query = GET_TRENDING;
    //debugger;
  }

  const { error, loading, data } = useAnilistAPI(query, variables);

  return { error, loading, data };
};
