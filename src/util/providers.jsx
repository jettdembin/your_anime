"use client";

import { useState } from "react";

import client from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";

export default function Providers({ children }) {
	// const [queryClient] = useState(() => new QueryClient());

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
