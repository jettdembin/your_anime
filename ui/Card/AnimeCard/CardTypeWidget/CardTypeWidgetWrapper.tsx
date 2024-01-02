"use client";

import { useCardTypeContext } from "@/context/CardTypeContext";

type CardType = "card" | "descriptive" | "list";

type Props = {
  children: React.ReactNode;
  cardType: CardType;
};

export default function CardTypeWidgetWrapper({ cardType, children }: Props) {
  const { handleCardType, cardType: contextCardType } = useCardTypeContext();

  return (
    <span
      className={`text-gray-800 cursor-pointer rounded-md p-2 bg-slate-200 hover:bg-slate-400`}
      onClick={() => handleCardType(cardType)}
    >
      {children}
    </span>
  );
}
