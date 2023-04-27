import { gql } from "@apollo/client";

// media (type: ${animeBrowseFilter.toUpperCase()}, sort: POPULARITY_DESC) {

export const GET_POPULAR_ANIME = gql`
	query GetPopularAnime($page: number?) {
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
				nextAiringEpisode {
					timeUntilAiring
					episode
				}
				averageScore
				studios(isMain: true) {
					nodes {
						name
					}
				}
				episodes
				genres
				status
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
				nextAiringEpisode {
					timeUntilAiring
				}
				studios(isMain: true) {
					nodes {
						name
					}
				}
			}
		}
	}
`;

export const GET_TOP_100_ANIME = gql`
	query GetTop100Anime {
		Page(page: 1, perPage: 100) {
			media(
				sort: SCORE_DESC
				format_in: [TV, TV_SHORT, MOVIE, OVA, ONA, SPECIAL]
			) {
				id
				id
				title {
					english
				}
				coverImage {
					medium
				}
				startDate {
					year
					month
					day
				}
				format
				episodes
				duration
				genres
				averageScore
				popularity
			}
		}
	}
`;
