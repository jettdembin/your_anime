"use client";

import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

const categories = ["Trending", "Popular", "Top Rated", "Upcoming"];

const CategoryWidget = () => {
	const searchParams = useSearchParams();

	const search = searchParams?.get("search") || "";
	const page = searchParams?.get("page") || "";

	// const [searchValue, setSearchValue] = useState(search);
	return (
		<div className="dropdown">
			<label tabIndex={0} className="btn m-1">
				{page}
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				{categories.map((category) => (
					<li key={category}>
						<a>{category}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryWidget;
