import React from "react";
import useCardType from "../Pages/Discover/hooks/useCardType";
import { useCardTypeContext } from "../Pages/Discover/context/CardTypeContext";

// type AnimeCardLayoutProps = {
// 	children: React.ReactNode;
// };

export const AnimeCardLayout = ({ children }) => {
	const childrenArray = React.Children.toArray(children);

	const { cardType } = useCardTypeContext();
	return (
		<>
			<section
				className={
					// "grid grid-cols-2 gap-4"
					cardType === "list"
						? "grid grid-cols-1 gap-4"
						: window.innerWidth >= 1280
						? "grid grid-cols-2 gap-4"
						: "grid grid-cols-4 gap-4"
				}
			>
				{childrenArray.map((child, index) => {
					const sm = window.innerWidth >= 640 && index % 2 === 1; // For sm screens
					const md =
						(window.innerWidth >= 768 &&
							window.innerWidth < 1280 &&
							index === childrenArray.length - 1) ||
						index % 4 === 1; // For md screens
					const xl = window.innerWidth >= 1280 && index % 2 === 1; // For xl screens
					let isLastCard = sm || md || xl;

					if (window.innerWidth >= 768 && window.innerWidth < 1280) {
						isLastCard = (index + 2) % 4 >= 2;
					}
					if (React.isValidElement(child)) {
						return React.cloneElement(child, {
							isLastCard: !isLastCard,
						});
					}
					return child;
				})}
			</section>
		</>
	);
};
