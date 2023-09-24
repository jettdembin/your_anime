"use client";

import client from "@/apollo-client";
import { useSearchParams } from "next/navigation";

import { ApolloProvider } from "@apollo/client";
import { SearchProvider } from "../components/Pages/Discover/context/SearchContext";

import useSearch from "../components/Pages/Discover/hooks/useSearch";

export default function Providers({ children }) {
	const searchParams = useSearchParams();
	const searchValue = searchParams?.get("search") || "";

	// const {
	// 	searchValues,
	// 	setSearchValues,
	// 	error: searchDataError,
	// 	loading: isSearchDataLoading,
	// 	data: searchData,
	// } = useSearch(searchValue);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
