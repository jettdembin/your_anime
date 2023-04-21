// queries.js or queries.ts
import { gql } from "@apollo/client";

export const GET_POPULAR_ANIME = gql`
	query GetPopularAnime {
		Page(page: 1, perPage: 10) {
			media(sort: POPULARITY_DESC) {
				id
				title {
					english
					native
				}
				coverImage {
					large
				}
			}
		}
	}
`;
