import { useState, useEffect } from "react";

type Option = {
	value: string;
	label: string;
};

type Props = {
	options: Option[];
	isOpen: boolean;
	label: string;
	onChange: (value: string) => void;
	onToggle: () => void;
};

const SelectWrapper: React.FC<Props> = ({
	options,
	label,
	onChange,
	onToggle,
	isOpen,
}) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		setIsExpanded(isOpen);
	}, [isOpen]);

	const handleChange = (option: Option) => {
		setSelectedOption(option);
		onChange(option.value);
	};

	return (
		<div className="relative inline-block text-left w-48">
			<button
				className="inline-flex justify-between w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
				id="options-menu"
				aria-haspopup="true"
				aria-expanded="true"
				onClick={() => {
					onToggle();
					setIsExpanded(!isExpanded);
				}}
			>
				{selectedOption.label}
				<svg
					className="h-4 w-4 ml-2 text-blue-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			{isExpanded && (
				<div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						{options.map((option) => (
							<button
								key={option.value}
								onClick={() => handleChange(option)}
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								role="menuitem"
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectWrapper;