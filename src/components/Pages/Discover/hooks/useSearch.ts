"use client";

import { useState, useEffect } from "react";

import { useBrowseAnime } from "@/src/graphql/queries";

const useSearch = (search: string | null) => {
	const [searchValues, setSearchValues] = useState({
		search: (!!search && search) || "",
		category: null,
		status: null,
		season: null,
		year: null,
	});

	useEffect(() => {
		if (!!search) {
			setSearchValues({ ...searchValues, search });
		}
	}, [search]);

	const { error, loading, data } = useBrowseAnime(
		...Object.values(searchValues)
	);

	return {
		searchValues,
		setSearchValues,
		error,
		loading,
		data,
	};
};

export default useSearch;
