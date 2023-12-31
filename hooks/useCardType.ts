import { useState } from "react";

type CardType = "card" | "descriptive" | "list";

const debounce = <F extends (...args: any[]) => any>(func: F, wait: number): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<F>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};



const useCardType = (
  defaultType: CardType = "card"
): {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  handleCardType: (type: CardType) => void;
} => {
  const [cardType, setCardType] = useState<CardType>(defaultType);

  const handleCardType = (type: CardType): void => {
    setCardType(type);
    console.log(type);
  };

  // useEffect(() => {
  //   // Debounce function to limit the number of times the resize handler is called
  //   const debouncedHandleResize = debounce(function handleResize() {
  //     if (window.innerWidth >= 1024) { // Tailwind's 'large' breakpoint
  //       handleCardType(defaultType);
  //     } else if  (window.innerWidth <= 640 && defaultType === "list") { // Tailwind's 'small' breakpoint
  //       handleCardType("list");
  //     }
  //     else {
  //       handleCardType("card");
  //     }
  //   }, 100);

  //   // Add event listener
  //   window.addEventListener("resize", debouncedHandleResize);

  //   // Call handler right away so state gets updated with initial window size
  //   debouncedHandleResize();

  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("resize", debouncedHandleResize);
  // }, [defaultType]);

  return { cardType, setCardType, handleCardType };
};

export default useCardType;
