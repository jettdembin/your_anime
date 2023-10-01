"use client";

import client from "@/apollo-client";

import { ApolloProvider } from "@apollo/client";
import { SearchProvider } from "../components/Pages/Discover/context/SearchContext";
import { CardTypeProvider } from "../components/Pages/Discover/context/CardTypeContext";
import useCardType from "../components/Pages/Discover/hooks/useCardType";

export default function Providers({ children }) {
	const { cardType, setCardType, handleCardType } = useCardType();
	return (
		<ApolloProvider client={client}>
			<CardTypeProvider value={{ cardType, setCardType, handleCardType }}>
				<SearchProvider>{children}</SearchProvider>
			</CardTypeProvider>
		</ApolloProvider>
	);
}
