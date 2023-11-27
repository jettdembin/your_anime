import React from "react";

const CardType = () => {
	return (
		<>
			<CardType
				media={media}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
			/>

			{hoveredAnime === media.id && (
				<div
					className={`xl:hidden absolute top-0 ${
						!!isLastCard ? "-left-4 left-triangle" : "right-0 right-triangle"
					}`}
				>
					<AnimeDetails
						isVisible={hoveredAnime === media.id}
						animeDetails={media}
						isLastCard={isLastCard}
						nextEpisodeDays={nextEpisodeDays}
					/>
				</div>
			)}
			{/* Content div related to the image */}
			<ListType
				media={media}
				isCardHovered={isCardHovered}
				setIsCardHovered={setIsCardHovered}
			/>
		</>
	);
};

export default CardType;
