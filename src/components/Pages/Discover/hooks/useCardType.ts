import { useState } from "react";

type CardType = "card" | "descriptive" | "list";

const useCardType = (): {
	cardType: CardType;
	setCardType: (type: CardType) => void;
	handleCardType: (type: CardType) => void;
} => {
	const cardTypes: CardType[] = ["card", "descriptive", "list"];
	const [cardType, setCardType] = useState<CardType>(cardTypes[0]);

	const handleCardType = (type: CardType): void => {
		setCardType(type);
	};

	return { cardType, setCardType, handleCardType };
};

export default useCardType;
