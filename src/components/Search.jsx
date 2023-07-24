"use client";

import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useBrowseAnime } from "../graphql/queries";
import { selectData } from "../consts";

import SelectWrapper from "./Elements/Select";
import { CardSectionLoader } from "./Elements/LoadingSection";
import { AnimeCardLayout } from "./Layout/AnimeCardLayou";
import AnimeCard from "./Pages/Home/ui/AnimeCard";

export default function Search() {
	const navRef = useRef(null);
	const router = useRouter();

	const searchParams = useSearchParams();

	const search = searchParams.get("search");

	const [openedSelect, setOpenedSelect] = useState(null);
	const [isFilterVisible, setIsFilterVisible] = useState(true);

	const [searchValues, setSearchValues] = useState({
		search: (!!search && search) || "",
		category: null,
		status: null,
		season: null,
		year: null,
	});

	useEffect(() => {
		if (!!navRef.current) navRef.current.focus();

		if (!searchValues?.search)
			router.push("/", undefined, {
				shallow: true,
			});
	}, [searchValues, router]);

	const { error, loading, data } = useBrowseAnime(
		...Object.values(searchValues)
	);
	// const { error, loading, data } = useBrowseAnime(searchValues);

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	// const filterRef = useRef();

	const handleChange = (option) => {
		// Handle the change here
		const categorySwitched = Object.keys(searchValues).filter(
			(key) => key == option.parent
		);

		setSearchValues({ ...searchValues, [categorySwitched]: option.value });
		debugger;
	};

	// const removeFilter = (parent: string, value: string | number) => {
	// 	setSearchValues((prevState) => {
	// 		let newSelections = { ...prevState };
	// 		newSelections[parent] = newSelections[parent].filter(
	// 			(val) => val !== value
	// 		);
	// 		return newSelections;
	// 	});
	// };

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
						type="text"
						placeholder="Search"
						value={searchValues.search}
						onChange={(e) => {
							router.push("/discover?search=" + e.target.value, undefined, {
								shallow: true,
							});
							setSearchValues({ ...searchValues, search: e.target.value });
						}}
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
			{loading ? (
				<CardSectionLoader />
			) : (
				<AnimeCardLayout>
					{data.Page.media.slice(0, 8)?.map((media, i) => (
						<AnimeCard key={i} media={media} />
					))}
				</AnimeCardLayout>
			)}
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
