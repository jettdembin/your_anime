import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

// media (type: ${animeBrowseFilter.toUpperCase()}, sort: POPULARITY_DESC) {

export const GET_POPULAR_ANIME = gql`
	query GetPopularAnime($page: Int) {
		Page(page: $page, perPage: 100) {
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

export const usePopularAnime = (page: any) => {
	const { error, loading, data } = useQuery(GET_POPULAR_ANIME, {
		variables: {
			page,
		},
	});

	return { error, loading, data };
};

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

export const useTrendingAnime = () => {
	const { error, loading, data } = useQuery(GET_TRENDING);

	return { error, loading, data };
};

export const GET_BROWSE_FILTERS = gql`
	query GetAnimes(
		$category: String
		$status: MediaStatus
		$season: MediaSeason
		$year: Int
	) {
		Page(page: 1, perPage: 10) {
			media(
				genre: $category
				status: $status
				season: $season
				seasonYear: $year
				type: ANIME
			) {
				id
				title {
					romaji
					english
					native
				}
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
				status
				episodes
				duration
				coverImage {
					large
				}
				genres
			}
		}
	}
`;

export const useBrowseAnime = (
	category: string,
	status: string,
	season: string,
	year: number
) => {
	const { error, loading, data } = useQuery(GET_BROWSE_FILTERS, {
		variables: {
			category,
			status,
			season,
			year,
		},
	});

	return { error, loading, data };
};

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
