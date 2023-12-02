"use client";

import client from "@/apollo-client";

import { ApolloProvider } from "@apollo/client";
import { SearchProvider } from "../components/Pages/Discover/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SearchProvider>{children}</SearchProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
