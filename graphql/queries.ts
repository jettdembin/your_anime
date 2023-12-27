"use client";

import { gql, useQuery } from "@apollo/client";

export const GET_POPULAR_ANIME = gql`
  query GetPopularAnime($page: Int) {
    Page(page: $page, perPage: 100) {
      media(sort: POPULARITY_DESC, isAdult: false) {
        id
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
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
        season
        seasonYear
      }
    }
  }
`;

export const usePopularAnime = (page: number = 1, perPage: number = 50) => {
  const { error, loading, data } = useQuery(GET_POPULAR_ANIME, {
    variables: {
      page: 1,
      perPage: 50,
    },
  });

  return { error, loading, data };
};

export const GET_TRENDING = gql`
  query GetTrending($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        sort: TRENDING_DESC
        status: RELEASING
        isAdult: false
      ) {
        id
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
        }
        averageScore
        studios(isMain: true) {
          nodes {
            name
          }
        }
        popularity
        episodes
        genres
        status
        season
        seasonYear
      }
    }
  }
`;
export const useTrendingAnime = (page: number, perPage: number) => {
  const { error, loading, data } = useQuery(GET_TRENDING, {
    variables: { page, perPage },
  });

  return { error, loading, data };
};

export const GET_BROWSE_FILTERS = gql`
  query GetAnimes(
    $category: String
    $status: MediaStatus
    $season: MediaSeason
    $year: Int
  ) {
    Page(page: 1, perPage: 50) {
      media(
        genre: $category
        status: $status
        season: $season
        seasonYear: $year
        type: ANIME
        isAdult: false
      ) {
        id
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
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
        season
        seasonYear
      }
    }
  }
`;

export const SEARCH_ANIMES_UPCOMING = gql`
  query SearchAnimes($search: String) {
    Page(page: 1, perPage: 50) {
      media(search: $search, type: ANIME, isAdult: false, sort: SCORE_DESC) {
        id
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
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
        season
        seasonYear
      }
    }
  }
`;
export const SEARCH_ANIMES_POPULAR = gql`
  query SearchAnimes(
    $search: String # $sort: [MediaSort] =  # $status: String # $season: String # $year: Int
  ) {
    Page(page: 1, perPage: 50) {
      media(
        search: $search
        type: ANIME
        isAdult: false
        sort: POPULARITY_DESC
      ) {
        id
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
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
        season
        seasonYear
      }
    }
  }
`;
export const SEARCH_ANIMES_TRENDING = gql`
  query SearchAnimes(
    $search: String # $sort: [MediaSort] =  # $status: String # $season: String # $year: Int
  ) {
    Page(page: 1, perPage: 50) {
      media(search: $search, type: ANIME, isAdult: false, sort: TRENDING_DESC) {
        id
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
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
        season
        seasonYear
      }
    }
  }
`;

export const useBrowseAnime = (
  search?: string,
  category?: string,
  status?: string,
  season?: string,
  year?: number
) => {
  const { error, loading, data } = useQuery(SEARCH_ANIMES_TRENDING, {
    variables: {
      search,
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
        title {
          english
          native
        }
        description
        source
        coverImage {
          medium
          large
          extraLarge
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
        }
        averageScore
        studios(isMain: true) {
          nodes {
            name
          }
        }
        popularity
        episodes
        genres
        status
        season
        seasonYear
      }
    }
  }
`;

const MEDIA_FIELDS = gql`
  fragment MediaFields on Media {
    id
    title {
      english
      native
    }
    description
    source
    coverImage {
      medium
      large
      extraLarge
    }
    trailer {
      id
      site
      thumbnail
    }
    nextAiringEpisode {
      timeUntilAiring
      episode
    }
    startDate {
      year
      month
      day
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
    season
    seasonYear
  }
`;
export const useAnimeDetails = (mediaId: number | null) => {
  const { error, loading, data } = useQuery(GET_ANIME_DETAILS, {
    variables: {
      id: mediaId,
    },
  });
  return { error, loading, data };
};

export const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id) {
      id
      format
      title {
        romaji
        english
        native
        userPreferred
      }
      synonyms
      description
      startDate {
        year
        month
        day
      }
      season
      seasonYear
      episodes
      duration
      status
      averageScore
      meanScore
      popularity
      favourites
      genres
      source
      hashtag
      studios(isMain: true) {
        nodes {
          name
        }
      }
      coverImage {
        medium
        large
        extraLarge
      }
      bannerImage
      trailer {
        id
        site
        thumbnail
      }
      nextAiringEpisode {
        timeUntilAiring
        episode
      }
      externalLinks {
        url
        site
      }
      tags {
        name
        rank
      }
      # staff {
      # 	nodes {
      # 		name
      # 		role
      # 	}
      # }
      # characters {
      # 	nodes {
      # 		name {
      # 			full
      # 		}
      # 		voiceActor(language: JAPANESE) {
      # 			name {
      # 				full
      # 			}
      # 		}
      # 	}
      # }
      relations {
        nodes {
          title {
            english
            userPreferred
          }
          type
          status
        }
      }
      characters {
        nodes {
          name {
            full
          }
          # voiceActor(language: JAPANESE) {
          # 	name {
          # 		full
          # 	}
          # }
          image {
            large
          }
        }
      }
      # siteStatistics {
      # 	statusDistribution {
      # 		status
      # 		amount
      # 	}
      # }
    }
  }
`;
