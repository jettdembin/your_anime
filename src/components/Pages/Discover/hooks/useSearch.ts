"use client";

import { useState, useEffect } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { useRouter } from "next/navigation";
import { GET_TRENDING } from "@/src/graphql/queries";

const useSearch = (userSearch) => {
	const categories = [
		{ label: "Trending", value: "TRENDING_DESC" },
		{ label: "Popular", value: "POPULARITY_DESC" },
		{ label: "Rating", value: "SCORE_DESC" },
	];
	const router = useRouter();
	// Create a new URLSearchParams instance from current query
	const params = new URLSearchParams(window?.location?.search);

	const { searchValue, categoryValue, query } = userSearch || {};

	const [category, setCategory] = useState(categories[0]);
	const [searchValues, setSearchValues] = useState({
		search: searchValue,
		// sort: categoryValue ?? category,
		status: null,
		season: null,
		year: null,
	});
	const [gqlQuery, setGqlQuery] = useState(query ?? GET_TRENDING);

	useEffect(() => {
		if (!!query && gqlQuery !== query) {
			setGqlQuery(query);
		}
	}, [query]);

	// const [query, setQuery] = useState(GET_TRENDING);

	console.log(query, "query");
	const { error, loading, data } = useAnilistAPI(gqlQuery ?? "", searchValues);

	const handleCategory = (category: any) => {
		setCategory(category);

		const { value } = category || {};

		params.set("category", value);
		const newURL = `/discover?${params.toString()}`;
		router.push(newURL);
	};

	const handleSearch = (e: any) => {
		const params = new URLSearchParams(window?.location?.search);

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
			setSearchValues((prev) => ({ ...prev, search: searchValue }));
		}
	}, [searchValue, categoryValue]);

	return {
		category,
		categories,

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
