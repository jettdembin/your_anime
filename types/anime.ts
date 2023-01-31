export type Anime = {
	_type: string;
	averagScore: number;
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
};

// id
// 						title {
// 							romaji
// 							english
// 							native
// 						}
// 						coverImage {
// 							large
// 						}
// 						format
// 						episodes
// 						status
// 						startDate {
// 							year
// 							month
// 							day
// 						}
// 						endDate {
// 							year
// 							month
// 							day
// 						}
// 						synonyms
// 						genres
// 						averageScore
// 						popularity
