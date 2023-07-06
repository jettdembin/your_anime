import React, { createContext, useContext, ReactNode } from "react";

import useCardType from "../hooks/useCardType";

type CardType = string; // Replace with the actual type for card type

interface CardTypeContextProps {
	value: CardType;
}

const CardTypeContext = createContext<CardType | null>(null);

interface CardTypeProviderProps {
	children: ReactNode;
	value: CardType;
}

const CardTypeProvider: React.FC<CardTypeProviderProps> = ({
	children,
	value,
}) => {
	const cardType = useCardType();
	return (
		<CardTypeContext.Provider value={cardType}>
			{children}
		</CardTypeContext.Provider>
	);
};

const useCardTypeContext = (): CardType | null =>
	useContext<CardType | null>(CardTypeContext);

export { CardTypeProvider, useCardTypeContext };
