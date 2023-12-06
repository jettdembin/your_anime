import { createContext, useContext, ReactNode } from "react";

import useCardType from "@/hooks/useCardType";

// Updated type to reflect the union of specific string values
type CardType = "card" | "descriptive" | "list";

interface CardTypeContextValue {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  handleCardType: (type: CardType) => void;
}

interface CardTypeProviderProps {
  children: ReactNode;
  type: CardType;
}

const CardTypeContext = createContext<CardTypeContextValue | null>(null);

const CardTypeProvider = ({ children, type }: CardTypeProviderProps) => {
  const contextValue = useCardType(type);

  return (
    <CardTypeContext.Provider value={contextValue}>
      {children}
    </CardTypeContext.Provider>
  );
};

const useCardTypeContext = (): CardTypeContextValue => {
  const context = useContext<CardTypeContextValue | null>(CardTypeContext);
  if (!context) {
    throw new Error(
      "useCardTypeContext must be used within a CardTypeProvider"
    );
  }
  return context;
};

export { CardTypeProvider, useCardTypeContext };
