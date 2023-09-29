// "use client";

import { useSearchParams } from "next/navigation";
import {
	GET_POPULAR_ANIME,
	GET_TRENDING,
	SEARCH_ANIMES_POPULAR,
	SEARCH_ANIMES_TRENDING,
	SEARCH_ANIMES_UPCOMING,
} from "@/src/graphql/queries";
import React, { createContext, useContext, ReactNode } from "react";
import useSearch from "../hooks/useSearch";

type CardType = {};
interface CardTypeProviderProps {
	children: ReactNode;
}

const SearchContext = createContext<CardType | null>(null);

const SearchProvider: React.FC<CardTypeProviderProps> = ({ children }) => {
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
	} else {
		query = GET_TRENDING;
	}

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
	} = useSearch({ searchValue, categoryValue, query });

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

const useSearchContext = (): any => useContext<CardType | null>(SearchContext);

export { SearchProvider, useSearchContext };
