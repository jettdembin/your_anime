"use client";

import { useSearchContext } from "../context/SearchContext";

const CategoryWidget = () => {
	const { category, handleCategory, categories } = useSearchContext();

	return (
		<div className="dropdown">
			<label tabIndex={0} className="btn m-1">
				{category?.label}
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				{categories?.map((category) => (
					<li
						key={category?.value}
						data-value={category?.value}
						onClick={(e) => {
							const selectedCategory =
								e.currentTarget.getAttribute("data-value") || "";
							handleCategory(selectedCategory);
						}}
					>
						<a>{category?.label} </a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryWidget;
