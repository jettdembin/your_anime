"use client";

import { useSearchParams } from "next/navigation";

import useCardType from "@/src/components/Pages/Discover/hooks/useCardType";

import { CardTypeProvider } from "@/src/components/Pages/Discover/context/CardTypeContext";
import { SearchProvider } from "@/src/components/Pages/Discover/context/SearchContext";

import Search from "@/src/components/Search";
import useSearch from "@/src/components/Pages/Discover/hooks/useSearch";

export default function DiscoverLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const search = searchParams?.get("search");

	const cardType = useCardType();
	const {
		searchValues,
		setSearchValues,
		error: searchError,
		loading: searchLoading,
		data: searchData,
	} = useSearch(search);

	return (
		<CardTypeProvider value={cardType}>
			<SearchProvider
				value={{
					searchValues,
					setSearchValues,
					searchError,
					searchLoading,
					searchData,
				}}
			>
				<header className="max-w-7xl md:mx-20 xl:mx-auto relative">
					<Search />
				</header>

				<main className="max-w-7xl md:mx-20 xl:mx-auto relative">
					{children}
				</main>
			</SearchProvider>
		</CardTypeProvider>
	);
}
