"use client";

import React, { createContext, useContext, ReactNode } from "react";

import useCardType from "../hooks/useCardType";

type CardType = {};
interface CardTypeProviderProps {
	children: ReactNode;
}

const CardTypeContext = createContext<CardType | null>(null);

const CardTypeProvider: React.FC<CardTypeProviderProps> = ({ children }) => {
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
