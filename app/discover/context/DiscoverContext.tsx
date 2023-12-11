"use client";

import React, { createContext, useContext, ReactNode } from "react";

type Discover = {};

interface DiscoverProviderProps {
  children: ReactNode;
  value: Discover;
}

const DiscoverContext = createContext<Discover | null>(null);

const DiscoverProvider: React.FC<DiscoverProviderProps> = ({
  children,
  value,
}) => {
  return (
    <DiscoverContext.Provider value={value}>
      {children}
    </DiscoverContext.Provider>
  );
};

const useDiscoverProvider = (): Discover | null =>
  useContext<Discover | null>(DiscoverContext);

export { DiscoverProvider, useDiscoverProvider };
