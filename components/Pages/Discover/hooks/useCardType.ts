import { useState } from "react";

type CardType = "card" | "descriptive" | "list";

const useCardType = (
  type: CardType = "card"
): {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  handleCardType: (type: CardType) => void;
} => {
  const [cardType, setCardType] = useState<CardType>(type);

  const handleCardType = (type: CardType): void => {
    setCardType(type);
  };

  return { cardType, setCardType, handleCardType };
};

export default useCardType;
