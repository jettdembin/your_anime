"use client";

import Search from "@/src/components/Search";

import { CardTypeProvider } from "@/src/components/Pages/Discover/context/CardTypeContext";
import useCardType from "@/src/components/Pages/Discover/hooks/useCardType";

export default function DiscoverLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cardType = useCardType();
	return (
		<CardTypeProvider value={cardType}>
			<header className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<Search />
			</header>

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">{children}</main>
		</CardTypeProvider>
	);
}
