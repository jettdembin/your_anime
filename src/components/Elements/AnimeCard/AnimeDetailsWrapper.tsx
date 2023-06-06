import React from "react";

const AnimeCardWrapper = ({ children, isLastCard, isVisible }) => {
	return (
		<div
			className={`absolute overflow-hidden ${
				isLastCard ? "right-full" : "left-full"
			} top-1/4 ml-4 w-64 p-4 bg-white text-gray-900 shadow-md rounded-lg z-10 ease-in opacity-0 ${
				isVisible && "animate-appearing-card"
			}`}
		>
			{children}
		</div>
	);
};

export default AnimeCardWrapper;
