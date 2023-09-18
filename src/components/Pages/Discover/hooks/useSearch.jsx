import { useState } from "react";

import { useBrowseAnime } from "@/src/graphql/queries";

const useSearch = (search) => {
	const [searchValues, setSearchValues] = useState({
		search: (!!search && search) || "",
		category: null,
		status: null,
		season: null,
		year: null,
	});

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
