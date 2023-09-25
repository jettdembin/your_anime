"use client";

import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import useSearch from "./Pages/Discover/hooks/useSearch";

export default function Search() {
	const navRef = useRef(null);
	const router = useRouter();

	const searchParams = useSearchParams();

	const search = searchParams.get("search");
	const category = searchParams.get("category");

	const [isFilterVisible, setIsFilterVisible] = useState(true);

	const { searchValues, handleSearch } = useSearch(search);

	useEffect(() => {
		if (!!navRef.current) navRef.current.focus();

		if (!searchValues?.search) {
			if (!!category) return;
			router.push("/", undefined, {
				shallow: true,
			});
		}
	}, [searchValues, router]);

	return (
		<>
			<section className="mt-16 mb-8">
				{/* <form onSubmit={() => {}}> */}
				<div className="mt-6">
					<h3 className="pb-4 text-3xl font-semibold text-gray-900">Browse</h3>
				</div>
				<div className="flex gap-8 mb-6">
					<input
						ref={navRef}
						className="w-full px-6 py-4 shadow-custom focus:outline-none"
						placeholder="Search for anime..."
						type="text"
						name="search"
						value={searchValues["search"] || ""}
						onChange={handleSearch}
					/>
					<button
						className="py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white border-none shadow-custom"
						onClick={() => setIsFilterVisible(!isFilterVisible)}
					>
						<span className="material-icons text-gray-800" alt="filter">
							menu
						</span>
					</button>
					{/* {isFilterVisible && (
						<div
							ref={filterRef}
							className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
						>
							<Filter
								isOpen={openedSelect === isFilterVisible}
								onToggle={() =>
									setOpenedSelect((prev) =>
										prev === "filter" ? null : "filter"
									)
								}
							/>
						</div>
					)} */}
				</div>

				{/* </form> */}
			</section>
		</>
	);
}

// {!!isFilterVisible && (
// 	<div className="w-full flex gap-6">
// 		{selectData.map((select, i) => (
// 			<SelectWrapper
// 				key={i}
// 				isOpen={openedSelect === i}
// 				onToggle={() =>
// 					setOpenedSelect((prev) => (prev === i ? null : i))
// 				}
// 				options={select.options}
// 				label={select.label}
// 				onChange={handleChange}
// 				value={searchValues[select.options[0].parent]}
// 			/>
// 		))}

// 		<div>{/* <button type="submit"></button> */}</div>
// 	</div>
// )}
