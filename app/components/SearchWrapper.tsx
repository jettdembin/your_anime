"use client";

import { SearchProvider } from "../discover/context/SearchContext";

import Search from "@/ui/Search";

type Props = {};

export default function SearchWrapper({}: Props) {
  return (
    <SearchProvider>
      <Search />
    </SearchProvider>
  );
}
