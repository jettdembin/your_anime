import { gql } from "@apollo/client";

// media (type: ${animeBrowseFilter.toUpperCase()}, sort: POPULARITY_DESC) {

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

export const GET_TRENDING = gql`
	query {
		Trending: Page {
			media(type: ANIME, sort: POPULARITY_DESC) {
				id
				title {
					romaji
					english
					native
				}
				coverImage {
					large
				}
				format
				episodes
				status
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				synonyms
				genres
				averageScore
				popularity
			}
		}
	}
`;
