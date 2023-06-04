export const selectData = [
	{
		label: "Genres",
		options: [
			{ value: "Action", label: "Action", parent: "category" },
			{ value: "Adventure", label: "Adventure", parent: "category" },
			{ value: "Mystery", label: "Mystery", parent: "category" },
			{ value: "Romance", label: "Romance", parent: "category" },
			{ value: "Slice of Life", label: "Slice of Life", parent: "category" },
			{ value: "Thriller", label: "Thriller", parent: "category" },
		],
	},
	{
		label: "Status",
		options: [
			{ value: "FINISHED", label: "Finished", parent: "status" },
			{ value: "RELEASING", label: "Ongoing", parent: "status" },
			{ value: "NOT_YET_RELEASED", label: "Coming Soon", parent: "status" },
			{ value: "CANCELLED", label: "Cancelled", parent: "status" },
			{ value: "HIATUS", label: "Haitus", parent: "status" },
		],
	},
	{
		label: "Season",
		options: [
			{ value: "SPRING", label: "Spring", parent: "season" },
			{ value: "SUMMER", label: "Summer", parent: "season" },
			{ value: "WINTER", label: "Winter", parent: "season" },
			{ value: "FALL", label: "Fall", parent: "season" },
		],
	},
	{
		label: "Year",
		options: [
			{ value: 2018, label: "2018", parent: "year" },
			{ value: 2019, label: "2019", parent: "year" },
			{ value: 2020, label: "2020", parent: "year" },
			{ value: 2021, label: "2021", parent: "year" },
			{ value: 2022, label: "2022", parent: "year" },
			{ value: 2023, label: "2023", parent: "year" },
			{ value: 2024, label: "2024", parent: "year" },
		],
	},
];
