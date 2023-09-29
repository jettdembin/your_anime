"use client";

import client from "@/apollo-client";

import { ApolloProvider } from "@apollo/client";
import { SearchProvider } from "../components/Pages/Discover/context/SearchContext";

export default function Providers({ children }) {
	return (
		<ApolloProvider client={client}>
			<SearchProvider>{children}</SearchProvider>
		</ApolloProvider>
	);
}
