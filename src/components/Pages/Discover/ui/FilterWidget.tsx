"use client";

import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

const FilterWidget = () => {
	const searchParams = useSearchParams();

	const search = searchParams?.get("search");

	// const [searchValue, setSearchValue] = useState(search);
	return (
		<div className={`p-2 ${search ? "bg-sky-400" : ""}`}>
			<h6 className="font-semibold text-white">Search: {search}</h6>
		</div>
	);
};

export default FilterWidget;
