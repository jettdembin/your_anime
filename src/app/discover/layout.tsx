"use client";

import { useSearchParams } from "next/navigation";

import useCardType from "@/src/components/Pages/Discover/hooks/useCardType";
import useSearch from "@/src/components/Pages/Discover/hooks/useSearch";

import { SearchProvider } from "@/src/components/Pages/Discover/context/SearchContext";
import { CardTypeProvider } from "@/src/components/Pages/Discover/context/CardTypeContext";

import Search from "@/src/components/Search";

export default function DiscoverLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const searchValue = searchParams?.get("search") || "";

	const cardType = useCardType();
	const {
		searchValues,
		setSearchValues,
		error: searchDataError,
		loading: isSearchDataLoading,
		data: searchData,
	} = useSearch(searchValue);

	return (
		<SearchProvider
			value={{
				searchValues,
				setSearchValues,
				searchDataError,
				isSearchDataLoading,
				searchData,
			}}
		>
			<CardTypeProvider value={cardType}>
				<header className="max-w-7xl md:mx-20 xl:mx-auto relative">
					<Search />
				</header>

				<main className="max-w-7xl md:mx-20 xl:mx-auto relative">
					{children}
				</main>
			</CardTypeProvider>
		</SearchProvider>
	);
}
