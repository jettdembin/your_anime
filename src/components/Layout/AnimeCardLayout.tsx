import React from "react";

type AnimeCardLayoutProps = {
	children: React.ReactNode;
};

export const AnimeCardLayout = ({ children }: AnimeCardLayoutProps) => {
	const childrenArray = React.Children.toArray(children);

	return (
		<>
			<section className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4">
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
