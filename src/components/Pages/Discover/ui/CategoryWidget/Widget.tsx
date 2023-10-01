import React, { useContext } from "react";
import { useCardTypeContext } from "../../context/CardTypeContext";

const Widget = ({ cardType }) => {
	const { handleCardType } = useCardTypeContext();

	return (
		<span
			className="material-icons text-gray-800 cursor-pointer"
			onClick={() => handleCardType(cardType)}
		>
			grid_view
		</span>
	);
};

export default Widget;
