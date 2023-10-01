"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import {
	GET_POPULAR_ANIME,
	GET_TOP_100_ANIME,
	GET_TRENDING,
	SEARCH_ANIMES_POPULAR,
	SEARCH_ANIMES_TRENDING,
	SEARCH_ANIMES_UPCOMING,
} from "@/src/graphql/queries";

import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";

const useViewAll = (page: number, perPage: number) => {
	const searchParams = useSearchParams();

	const searchValue = searchParams?.get("search") || "";
	const categoryValue = searchParams?.get("category") || "";

	let query;
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
	// debugger;

	const { error, loading, data } = useAnilistAPI(query);

	return { error, loading, data };
};

export { useViewAll };
