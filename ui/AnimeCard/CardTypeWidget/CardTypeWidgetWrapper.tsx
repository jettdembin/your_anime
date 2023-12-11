"use client";

import { useCardTypeContext } from "@/context/CardTypeContext";

type CardType = "card" | "descriptive" | "list";

type Props = {
  children: React.ReactNode;
  cardType: CardType;
};

export default function CardTypeWidgetWrapper({ cardType, children }: Props) {
  const { handleCardType } = useCardTypeContext();

  return (
    <span
      className="text-gray-800 cursor-pointer"
      onClick={() => handleCardType(cardType)}
    >
      {children}
    </span>
  );
}
