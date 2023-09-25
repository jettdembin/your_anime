"use client";

import React, { createContext, useContext, ReactNode } from "react";

type CardType = { handleCardType: () => void };
interface CardTypeProviderProps {
	children: ReactNode;
	value: CardType;
}

const CardTypeContext = createContext<CardType | null>(null);

const CardTypeProvider: React.FC<CardTypeProviderProps> = ({
	children,
	value,
}) => {
	return (
		<CardTypeContext.Provider value={value}>
			{children}
		</CardTypeContext.Provider>
	);
};

const useCardTypeContext = (): CardType | null =>
	useContext<CardType | null>(CardTypeContext);

export { CardTypeProvider, useCardTypeContext };
