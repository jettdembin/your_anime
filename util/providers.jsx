"use client";

import client from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";

import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/app/discover/context/SearchContext";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SearchProvider>{children}</SearchProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
