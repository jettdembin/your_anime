"use client";

import { useCardTypeContext } from "@/context/CardTypeContext";
import React from "react";

export const AnimeCardLayout = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const { cardType } = useCardTypeContext();

  // Define styles for different card types using TailwindCSS responsive utilities
  const styles = {
    card: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:gap-4",
    descriptive: "grid grid-cols-1 xl:grid-cols-2 md:gap-4",
    list: "grid grid-cols-1 md:gap-4",
  };

  return (
    <section className={styles[cardType]}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isLastCard: index === childrenArray.length - 1,
          });
        }
        return child;
      })}
    </section>
  );
};
