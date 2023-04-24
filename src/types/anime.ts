export type Anime = {
	_type: string;
	averageScore: number; // Fixed typo in the property name
	coverImage: {
		_typeName: string;
		large: string;
	};
	endDate: {
		__typename: string;
		day: number;
		month: number;
		year: number;
	};
	episodes: number;
	format: string;
	genres: [string];
	id: number;
	popularity: number;
	startDate: {
		__typename: string;
		day: number;
		month: number;
		year: number;
	};
	status: string;
	synonyms: [string];
	title: {
		__typename: string;
		english: string;
		native: string;
		romaji: string;
	};
	nextAiringEpisode: AiringSchedule | null;
	studios: Studio;
};

export interface Title {
	english?: string;
	native?: string;
	romaji?: string;
}

export interface CoverImage {
	large: string;
}

export interface AiringSchedule {
	timeUntilAiring: number;
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

export interface DateProps {
	year: number;
	month: number;
	day: number;
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
