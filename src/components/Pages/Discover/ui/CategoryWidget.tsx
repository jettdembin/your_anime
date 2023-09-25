"use client";

import React, { useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useCardTypeContext } from "../context/CardTypeContext";
import { useSearchContext } from "../context/SearchContext";

const categories = [
	{ label: "Trending", value: "TRENDING_DESC" },
	{ label: "Popular", value: "POPULAR_DESC" },
	{ label: "Upcoming", value: "UPCOMING_DESC" },
];

const CategoryWidget = () => {
	const searchParams = useSearchParams();

	const categoryValue = searchParams?.get("category") || "";

	const { category, handleCategory } = useSearchContext();

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
				{category.label}
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				{categories.map((category) => (
					<li
						key={category.value}
						data-value={category.value}
						onClick={(e) => {
							const selectedCategory =
								e.currentTarget.getAttribute("data-value") || "";
							handleCategory(selectedCategory);
						}}
					>
						<a>{category.label} </a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryWidget;
