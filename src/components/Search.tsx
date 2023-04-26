"use client";

import { useState, useRef } from "react";
import SelectWrapper from "./Elements/Select";
import Filter from "./Elements/Filter";

export default function Search() {
	const [openedSelect, setOpenedSelect] = useState<number | null>(null);
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

	const filterRef = useRef();

	const selectData = [
		{
			label: "Genres",
			options: [
				{ value: "1", label: "Action" },
				{ value: "2", label: "Adventure" },
			],
		},
		{
			label: "Status",
			options: [
				{ value: "1", label: "Ongoing" },
				{ value: "2", label: "Finished" },
			],
		},
		{
			label: "Season",
			options: [
				{ value: "1", label: "Spring" },
				{ value: "2", label: "Summer" },
			],
		},
		{
			label: "Year",
			options: [
				{ value: "1", label: "2021" },
				{ value: "2", label: "2022" },
			],
		},
	];

	const handleChange = (value: string) => {
		// Handle the change here
	};

	return (
		<section className="mx-8 mt-16 mb-8">
			<div className="mt-6 ">
				<h3 className="pb-4 text-md font-semibold text-gray-900">Browse</h3>
				<div className="flex"></div>
			</div>
			<div className="flex gap-6">
				{selectData.map((select, i) => (
					<SelectWrapper
						key={i}
						isOpen={openedSelect === i}
						onToggle={() => setOpenedSelect((prev) => (prev === i ? null : i))}
						options={select.options}
						label={select.label}
						onChange={handleChange}
					/>
				))}
				<div className="relative">
					<button
						className="py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
			</div>
		</section>
	);
}
