"use client";

import client from "@/apollo-client";

import { SearchProvider } from "@/app/discover/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import { ApolloProvider } from "@apollo/client";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <SearchProvider>
        <AuthProvider>{children}</AuthProvider>
      </SearchProvider>
    </ApolloProvider>
  );
}
