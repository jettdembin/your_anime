"use client";

import React, { useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useCardTypeContext } from "../context/CardTypeContext";
import { useSearchContext } from "../context/SearchContext";

const categories = ["Trending", "Popular", "Top Rated", "Upcoming"];

const CategoryWidget = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	// Create a new URLSearchParams instance from current query
	const params = new URLSearchParams(window.location.search);

	const search = searchParams?.get("search") || "";
	const page = searchParams?.get("page") || "";

	const { setSearchValues } = useSearchContext();
	const [category, setCategory] = useState(!!page ? page : categories[0]); // [0] is the default value

	const handleCategory = (category: string) => {
		setCategory(category);

		//set the page to the category
		params.set("page", category);
		const newURL = `/discover?${params.toString()}`;
		router.push(newURL);
	};

	return (
		<div className="dropdown">
			<label tabIndex={0} className="btn m-1">
				{category}
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				{categories.map((category) => (
					<li
						key={category}
						onClick={() => {
							handleCategory(`${category}`);

							setSearchValues();
						}}
					>
						<a>{category}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryWidget;
