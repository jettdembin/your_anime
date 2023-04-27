import { useQuery } from "@apollo/client";

export const useAnilistAPI = (query: any) => {
	const { error, loading, data } = useQuery(query);
	return { error, loading, data };
};
