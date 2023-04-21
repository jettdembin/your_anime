// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
// 	uri: "https://graphql.anilist.co",
// 	cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
	uri: "https://graphql.anilist.co",
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default client;
