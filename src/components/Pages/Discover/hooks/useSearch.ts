"use client";

import { useState, useEffect } from "react";

import { useParams, useSearchParams } from "next/navigation";

import {
	GET_POPULAR_ANIME,
	GET_TRENDING,
	SEARCH_ANIMES,
} from "@/src/graphql/queries";
import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { router } from "next/router";

const useSearch = () => {
	const searchParams = useSearchParams();
	// Create a new URLSearchParams instance from current query
	const params = new URLSearchParams(window.location.search);

	const searchValue = searchParams?.get("search") || "";
	const category = searchParams?.get("category") || "";

	const [searchValues, setSearchValues] = useState({
		search: (!!searchValue && searchValue) || "",
		category: category,
		status: null,
		season: null,
		year: null,
	});

	let query;

	if (category?.toLowerCase() === "trending" && !searchValue) {
		query = GET_TRENDING;
	}
	if (category?.toLowerCase() === "popular" && !searchValue) {
		query = GET_POPULAR_ANIME;
	}
	if (!!searchValue) {
		query = SEARCH_ANIMES;
		debugger;
	}
	if (!category?.toLowerCase()) {
		query = GET_TRENDING;
	}

	const handleCategory = (category: string) => {
		// setCategory(category);

		//set the category to the category
		params.set("category", category);
		const newURL = `/discover?${params.toString()}`;
		router.push(newURL);
	};

	useEffect(() => {
		if (!!searchValue) {
			setSearchValues({ ...searchValues, search: searchValue });
		}
	}, [searchValue]);

	const { error, loading, data } = useAnilistAPI(query, searchValues);
	// const { error, loading, data } = useBrowseAnime(
	// 	...Object.values(searchValues)
	// );

	return {
		handleCategory,
		searchValues,
		setSearchValues,
		error,
		loading,
		data,
	};
};

export default useSearch;
