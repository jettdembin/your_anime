export interface Title {
	english?: string;
	native?: string;
	romaji?: string;
}

export interface DateProps {
	year: number;
	month: number;
	day: number;
}

export interface CoverImage {
	large: string;
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

export interface Media {
	id: number;
	title: Title;
	coverImage: CoverImage;
	format?: string;
	episodes?: number;
	status?: string;
	startDate?: DateProps;
	endDate?: DateProps;
	synonyms?: string[];
	genres?: string[];
	averageScore?: number;
	popularity?: number;
	nextAiringEpisode: AiringSchedule | null;
	studios: Studio;
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
