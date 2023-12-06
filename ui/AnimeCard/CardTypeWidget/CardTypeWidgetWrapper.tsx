import { useCardTypeContext } from "@/context/CardTypeContext";

export default function CardTypeWidgetWrapper({ cardType, children }) {
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
