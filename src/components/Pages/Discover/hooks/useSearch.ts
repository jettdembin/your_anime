"use client";

import { useState, useEffect } from "react";

import { useParams, useSearchParams } from "next/navigation";

import {
	GET_POPULAR_ANIME,
	GET_TRENDING,
	SEARCH_ANIMES,
} from "@/src/graphql/queries";
import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { useRouter } from "next/navigation";

const useSearch = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	// Create a new URLSearchParams instance from current query
	const params = new URLSearchParams(window.location.search);

	const searchValue = searchParams?.get("search") || "";
	const category = searchParams?.get("category") || "";

	const [searchValues, setSearchValues] = useState({
		search: searchValue,
		sort: category,
		status: null,
		season: null,
		year: null,
	});

	let query;

	if (category?.toLowerCase() === "trending" && !searchValue) {
		query = GET_TRENDING;
	} else if (category?.toLowerCase() === "popular" && !searchValue) {
		query = GET_POPULAR_ANIME;
	} else if (!!searchValue) {
		query = SEARCH_ANIMES;
		// debugger;
	} else if (!searchValue && !!category) {
		query = GET_TRENDING;
	} else query = GET_TRENDING;

	const handleCategory = (category: string) => {
		// setCategory(category);

		params.set("category", category);
		const newURL = `/discover?${params.toString()}`;
		router.push(newURL);
	};
	const handleSearch = (e: any) => {
		const params = new URLSearchParams(window.location.search);

		params.set("search", e.target.value);
		const newURL = `/discover?${params.toString()}`;
		router.push(newURL, undefined, {
			shallow: true,
		});

		setSearchValues((prev) => ({
			...prev,
			search: e.target.value,
		}));
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
		handleSearch,
		setSearchValues,
		searchValues,
		error,
		loading,
		data,
	};
};

export default useSearch;
