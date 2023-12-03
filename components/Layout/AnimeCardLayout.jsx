"use client";

import React from "react";

import { useCardTypeContext } from "../../context/CardTypeContext";

export const AnimeCardLayout = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  const { cardType } = useCardTypeContext();

  const styles = {
    card: "grid grid-cols-4 gap-4",
    descriptive: "grid grid-cols-2 gap-4",
    list: "grid grid-cols-1 gap-4",
  };
  return (
    <>
      <section
        className={
          cardType === "card"
            ? styles.card
            : cardType === "descriptive"
            ? styles.descriptive
            : styles.list
        }
      >
        {childrenArray.map((child, index) => {
          const sm = window.innerWidth >= 640 && index % 2 === 1; // For sm screens
          const md =
            (window.innerWidth >= 768 &&
              window.innerWidth < 1280 &&
              index === childrenArray.length - 1) ||
            index % 4 === 1; // For md screens
          const xl = window.innerWidth >= 1280 && index % 2 === 1; // For xl screens
          let isLastCard = sm || md || xl;

          if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            isLastCard = (index + 2) % 4 >= 2;
          }
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isLastCard: !isLastCard,
            });
          }
          return child;
        })}
      </section>
    </>
  );
};
