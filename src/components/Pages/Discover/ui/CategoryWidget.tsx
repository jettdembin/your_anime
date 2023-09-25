"use client";

import React, { useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useCardTypeContext } from "../context/CardTypeContext";
import { useSearchContext } from "../context/SearchContext";

const categories = ["Trending", "Popular", "Top Rated", "Upcoming"];

const CategoryWidget = () => {
	const searchParams = useSearchParams();

	const category = searchParams?.get("category") || "";

	const { setSearchValues, handleCategory } = useSearchContext();

	// const [category, setCategory] = useState(!!page ? page : categories[0]); // [0] is the default value

	// const handleCategory = (category: string) => {
	// 	setCategory(category);

	// 	//set the page to the category
	// 	params.set("category", category);
	// 	const newURL = `/discover?${params.toString()}`;
	// 	router.push(newURL);
	// };

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
						onClick={(e) => {
							const selectedCategory = e.target.text || "";
							handleCategory(selectedCategory);
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
