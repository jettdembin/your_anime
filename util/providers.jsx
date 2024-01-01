"use client";

import client from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";

import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
