"use client";

import { useState, useRef } from "react";

import { useBrowseAnime } from "../graphql/queries";

import { CardSectionLoader } from "./Elements/LoadingSection.tsx";
import SelectWrapper from "./Elements/Select";
import SelectedFilters from "./SelectedFilters";
import Filter from "./Elements/Filter";
import AnimeCard from "./Elements/AnimeCard";

export default function Search() {
	const [openedSelect, setOpenedSelect] = useState<number | null>(null);
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

	const filterRef = useRef();

	const selectData = [
		{
			label: "Genres",
			options: [
				{ value: "Action", label: "Action", parent: "category" },
				{ value: "Adventure", label: "Adventure", parent: "category" },
			],
		},
		{
			label: "Status",
			options: [
				{ value: "FINISHED", label: "Finished", parent: "status" },
				{ value: "RELEASING", label: "Ongoing", parent: "status" },
				{ value: "NOT_YET_RELEASED", label: "Coming Soon", parent: "status" },
				{ value: "CANCELLED", label: "Cancelled", parent: "status" },
				{ value: "HIATUS", label: "Haitus", parent: "status" },
			],
		},
		{
			label: "Season",
			options: [
				{ value: "SPRING", label: "Spring", parent: "season" },
				{ value: "SUMMER", label: "Summer", parent: "season" },
				{ value: "WINTER", label: "Winter", parent: "season" },
				{ value: "FALL", label: "Fall", parent: "season" },
			],
		},
		{
			label: "Year",
			options: [
				{ value: 2018, label: "2018", parent: "year" },
				{ value: 2019, label: "2019", parent: "year" },
				{ value: 2020, label: "2020", parent: "year" },
				{ value: 2021, label: "2021", parent: "year" },
				{ value: 2022, label: "2022", parent: "year" },
				{ value: 2023, label: "2023", parent: "year" },
				{ value: 2024, label: "2024", parent: "year" },
			],
		},
	];

	const handleChange = (option) => {
		// Handle the change here
		const categorySwitched = Object.keys(search).filter(
			(key) => key == option.parent
		);

		setSearch({ ...search, [categorySwitched]: option.value });
	};

	const removeFilter = (parent: string, value: string | number) => {
		setSearch((prevState) => {
			let newSelections = { ...prevState };
			newSelections[parent] = newSelections[parent].filter(
				(val) => val !== value
			);
			return newSelections;
		});
	};

	const [search, setSearch] = useState({
		category: "Action",
		status: "FINISHED",
		season: "WINTER",
		year: 2022,
	});

	const { error, loading, data } = useBrowseAnime(...Object.values(search));

	if (loading) {
		return (
			// <div>testing</div>
			<>
				<section className="mt-16 mb-8">
					{/* <form onSubmit={() => {}}> */}
					<div className="mt-6">
						<h3 className="pb-4 text-3xl font-semibold text-gray-900">
							Browse
						</h3>
					</div>
					<div className="flex gap-8 mb-6">
						<input
							className="w-full px-6 py-4"
							type="text"
							placeholder="Search"
						/>
						<button
							className="py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
							onClick={() => setIsFilterVisible(!isFilterVisible)}
						>
							Filter
						</button>
						{isFilterVisible && (
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
						)}
					</div>
					<SelectedFilters filters={search} onRemoveFilter={removeFilter} />
					<div className="w-full flex gap-6">
						{selectData.map((select, i) => (
							<SelectWrapper
								key={i}
								isOpen={openedSelect === i}
								onToggle={() =>
									setOpenedSelect((prev) => (prev === i ? null : i))
								}
								options={select.options}
								label={select.label}
								onChange={handleChange}
								value={search[select.options[0].parent]}
							/>
						))}

						<div>{/* <button type="submit"></button> */}</div>
					</div>
					{/* </form> */}
				</section>
				<CardSectionLoader />
			</>
		);
	}
	if (!loading) {
		debugger;
	}
	if (error) {
		console.log(error.networkError?.result, "error object");
		return <p>Error: {error.message}</p>;
	}

	return (
		<>
			<section className="mt-16 mb-8">
				{/* <form onSubmit={() => {}}> */}
				<div className="mt-6">
					<h3 className="pb-4 text-3xl font-semibold text-gray-900">Browse</h3>
				</div>
				<div className="flex gap-8 mb-6">
					<input
						className="w-full px-6 py-4"
						type="text"
						placeholder="Search"
					/>
					<button
						className="py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 bg-white border-none"
						onClick={() => setIsFilterVisible(!isFilterVisible)}
					>
						<span className="material-icons" alt="filter">
							menu
						</span>
					</button>
					{isFilterVisible && (
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
					)}
				</div>
				<SelectedFilters filters={search} onRemoveFilter={removeFilter} />
				<div className="w-full flex gap-6">
					{selectData.map((select, i) => (
						<SelectWrapper
							key={i}
							isOpen={openedSelect === i}
							onToggle={() =>
								setOpenedSelect((prev) => (prev === i ? null : i))
							}
							options={select.options}
							label={select.label}
							onChange={handleChange}
							value={search[select.options[0].parent]}
						/>
					))}

					<div>{/* <button type="submit"></button> */}</div>
				</div>
				{/* </form> */}
			</section>
			<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
				{data.Page.media.slice(0, 8)?.map((media: Media, i: number) => (
					<AnimeCard key={i} media={media} />
				))}
			</section>
		</>
	);
}
