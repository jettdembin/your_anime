"use client";

interface SelectedFiltersProps {
	filters: {
		category: string;
		status: string;
		season: string;
		year: number;
	};
	onRemoveFilter: (parent: string, value: string | number) => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
	filters,
	onRemoveFilter,
}) => {
	return (
		<div className="flex flex-wrap">
			{/* {Object.entries(filters)?.map(([parent, values]) => {
				return values?.map((value) => (
					<div
						key={`${parent}-${value}`}
						className="flex items-center bg-gray-200 rounded px-2 py-1 mr-2 mb-2"
					>
						<div className="text-sm font-medium text-gray-700">{value}</div>
						<button
							className="ml-2 text-sm text-gray-500 hover:text-gray-700"
							onClick={() => onRemoveFilter(parent, value)}
						>
							&times;
						</button>
					</div>
				));
			})} */}
		</div>
	);
};

export default SelectedFilters;
