export interface Title {
  english?: string;
  native?: string;
  romaji?: string;
  userPreferred?: string;
}

export interface DateProps {
  year: number;
  month: number;
  day: number;
}

export interface CoverImage {
  medium?: string;
  large?: string;
  extraLarge?: string;
}
export interface Relation {
  title: Title;
  type: string;
  status: string;
}

export interface Relations {
  nodes?: Relation[];
}

export interface Relation {
  title: Title;
  type: string;
  status: string;
}

export interface Character {
  name: string;
  image: {
    large: string;
  };
}

export interface Characters {
  nodes: Character[];
}
export interface AiringSchedule {
  timeUntilAiring: number;
  episode: number | null;
}

export interface StudioNode {
  name: string;
}

export interface Studio {
  nodes: StudioNode[];
}

// export interface Media {
//   id: number | string;
//   title: Title;
//   coverImage: CoverImage;
//   format?: string;
//   episodes?: number;
//   description?: string;
//   trailer?: {
//     id: string;
//     site: string;
//     thumbnail: string;
//   };
//   bannerImage: string;
//   tags?: [];
//   relations?: Relations;
//   characters?: Characters;
//   status?: string;
//   startDate?: DateProps;
//   endDate?: DateProps;
//   synonyms?: string[];
//   genres?: string[];
//   averageScore?: number;
//   popularity?: number;
//   nextAiringEpisode: AiringSchedule | null;
//   studios: Studio;
//   season: string | null;
//   seasonYear?: string | null;
// }
export interface Media {
  id: string;
  title: Title; // Assuming Title is defined elsewhere
  coverImage: CoverImage; // Assuming CoverImage is defined elsewhere
  format?: string;
  episodes?: number;
  description?: string;
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  };
  bannerImage: string;
  tags?: []; // You may want to specify a more detailed type for tags
  relations?: Relations; // Assuming Relations is defined elsewhere
  characters?: Characters; // Assuming Characters is defined elsewhere
  status?: string;
  startDate?: DateProps; // Assuming DateProps is defined elsewhere
  endDate?: DateProps; // Assuming DateProps is defined elsewhere
  synonyms?: string[];
  genres?: string[];
  averageScore?: number;
  popularity?: number;
  nextAiringEpisode: AiringSchedule | null; // Assuming AiringSchedule is defined elsewhere
  studios: Studio; // Assuming Studio is defined elsewhere
  season: string | null;
  seasonYear?: string | null;
  // Fields from the second definition that are not conflicting
}

export interface Page {
  media: Media[];
}

export interface GetPopularAnimeResponse {
  Page: Page;
}

export interface GetTrendingResponse {
  Trending: Page;
}

export interface MediaNextAiringEpisode {
  timeUntilAiring: number | null;
  episode: number | null;
}

export interface MediaStudio {
  name: string | null;
}

export interface GetPopularAnimeVariables {
  page: number | null;
}

export default GetPopularAnimeResponse;
