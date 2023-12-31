import React, { ReactNode } from "react";

import { useCardTypeContext } from "@/context/CardTypeContext";

// Define the props for child components that accept `isLastCard`
interface ChildComponentProps {
  isLastCard?: boolean;
}

// Extend the ReactElement type to include `isLastCard` in props
type ExtendedElement = React.ReactElement & { props: ChildComponentProps };

interface AnimeCardLayoutProps {
  children: ReactNode;
}

export const AnimeCardLayout: React.FC<AnimeCardLayoutProps> = ({
  children,
}) => {
  const childrenArray = React.Children.toArray(children);
  const { cardType } = useCardTypeContext();

  const styles = {
    card: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:gap-4",
    descriptive: "grid grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4",
    list: "grid grid-cols-1 gap-6 md:gap-4",
  };

  return (
    <section className={styles[cardType]}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child) && typeof child.type !== "string") {
          return React.cloneElement(child as ExtendedElement, {
            isLastCard: index === childrenArray.length - 1,
          });
        }
        return child;
      })}
    </section>
  );
};
