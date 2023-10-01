"use client";

import { useSearchParams } from "next/navigation";

import {
	GET_POPULAR_ANIME,
	GET_TRENDING,
	SEARCH_ANIMES_POPULAR,
	SEARCH_ANIMES_TRENDING,
	SEARCH_ANIMES_UPCOMING,
} from "@/src/graphql/queries";

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
	const { cardType, setCardType, handleCardType } = useCardType();

	return (
		// <SearchProvider>
		<CardTypeProvider value={{ cardType, setCardType, handleCardType }}>
			<header className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<Search />
			</header>

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">{children}</main>
		</CardTypeProvider>
		// </SearchProvider>
	);
}
