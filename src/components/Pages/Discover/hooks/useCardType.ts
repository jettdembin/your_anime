import { useState } from "react";

type CardType = "card" | "descriptive" | "list";

const useCardType = (): {
	cardType: CardType;
	setCardType: (type: CardType) => void;
} => {
	const cardTypes: CardType[] = ["card", "descriptive", "list"];
	const [cardType, setCardType] = useState<CardType>(cardTypes[0]);

	return { cardType, setCardType };
};

export default useCardType;
