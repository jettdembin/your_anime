"use client";

import { useRef, useState } from "react";
import SelectWrapper from "./Select";
import useClickOutside from "@/src/hooks/useClickOutside";

const Filter = ({ onToggle }) => {
	const [openedSelect, setOpenedSelect] = useState<number | null>(null);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const filterData = [
		{
			label: "Airing Status",
			options: [
				{ value: "ongoing", label: "Ongoing" },
				{ value: "finished", label: "Finished" },
			],
		},
		{
			label: "Streaming On",
			options: [
				{ value: "crunchyroll", label: "Crunchyroll" },
				{ value: "funimation", label: "Funimation" },
			],
		},
		{
			label: "Country Of Origin",
			options: [
				{ value: "japan", label: "Japan" },
				{ value: "usa", label: "USA" },
			],
		},
		{
			label: "Source Material",
			options: [
				{ value: "manga", label: "Manga" },
				{ value: "novel", label: "Novel" },
			],
		},
	];

	//listens to user click to close div if button click not contained in div
	const selectRef = useRef(null);
	useClickOutside(selectRef, () => {
		if (isExpanded) {
			onToggle();
			setIsExpanded(false);
		}
	});

	return (
		<section className="mt-16 mb-8" ref={selectRef}>
			<div className="mt-6">
				<h3 className="pb-4 text-md font-semibold text-gray-900">Filters</h3>
				<div className="flex gap-6 flex-wrap">
					{filterData.map((filter, i) => (
						<SelectWrapper
							key={i}
							isOpen={openedSelect === i}
							onToggle={() =>
								setOpenedSelect((prev) => (prev === i ? null : i))
							}
							options={filter.options}
							label={filter.label}
						/>
					))}
					<button>Expand Advanced Filters</button>
				</div>
				<div>
					<label htmlFor="year-range">Year Range</label>
					<input type="range" name="year-range" />
					<label htmlFor="episodes">Episodes</label>
					<input type="range" name="episodes" />
					<label htmlFor="duration">Duration</label>
					<input type="range" name="duration" />
				</div>
			</div>
		</section>
	);
};

export default Filter;
