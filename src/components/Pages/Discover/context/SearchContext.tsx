"use client";

import React, { createContext, useContext, ReactNode } from "react";

type CardType = {};
interface CardTypeProviderProps {
	children: ReactNode;
	value: CardType;
}

const SearchContext = createContext<CardType | null>(null);

const SearchProvider: React.FC<CardTypeProviderProps> = ({
	children,
	value,
}) => {
	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
};

const useSearchContext = (): any => useContext<CardType | null>(SearchContext);

export { SearchProvider, useSearchContext };
