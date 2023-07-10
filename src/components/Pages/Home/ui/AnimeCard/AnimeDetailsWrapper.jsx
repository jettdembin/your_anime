// creates animated wrapper for the anime card details to show left or right depending on amount of cards and its index

import React from "react";

const AnimeCardWrapper = ({ children, isLastCard, isVisible }) => {
	return (
		<div
			className={`absolute w-80 overflow-hidden ${
				isLastCard ? "right-full" : "left-full"
			} top-1/4 ml-4 w-64 p-6 bg-white text-gray-900 shadow-md rounded-lg z-10 ease-in opacity-0 ${
				isVisible && "animate-appearing-card"
			}`}
		>
			{children}
		</div>
	);
};

export default AnimeCardWrapper;
