"use client";

import { useState } from "react";
import SelectWrapper from "./Elements/Select";

export default function Search() {
	const [openedSelect, setOpenedSelect] = useState<number | null>(null);

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
				<button>test</button>
			</div>
		</section>
	);
}
