import { useQuery } from "@apollo/client";

import { GET_POPULAR_ANIME, GET_TRENDING } from "@/src/graphql/queries";

export const useAnilistAPI = (
	page: number,
	perPage: number,
	// query: any,
	gql: any
) => {
	const { error, loading, data } = useQuery(GET_TRENDING, {
		variables: {
			page,
			perPage,
		},
	});
	return { error, loading, data };
};
