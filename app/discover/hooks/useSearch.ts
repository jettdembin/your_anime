// useSearch.js

"use client";

import { GET_TRENDING } from "@/graphql/queries";
import { useAnilistAPI } from "@/hooks/useAnilistAPI";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserSearch = {
  searchValue?: string;
  categoryValue?: string;
  query?: any;
};

type Category = {
  label: string;
  value: string;
};

const useSearch = (userSearch: UserSearch) => {
  const router = useRouter();

  const [gqlQuery, setGqlQuery] = useState(userSearch.query ?? GET_TRENDING);
  const [searchValues, setSearchValues] = useState({
    search: userSearch.searchValue,
    status: null,
    season: null,
    year: null,
  });

  useEffect(() => {
    if (userSearch.query && gqlQuery !== userSearch.query) {
      setGqlQuery(userSearch.query);
    }
  }, [userSearch.query, gqlQuery]);

  const { error, loading, data } = useAnilistAPI(gqlQuery, searchValues);

  const categories: Category[] = [
    { label: "Trending", value: "TRENDING_DESC" },
    { label: "Popular", value: "POPULARITY_DESC" },
    { label: "Rating", value: "SCORE_DESC" },
  ];

  const categoryMap: { [key: string]: Category } = {
    TRENDING_DESC: categories[0],
    POPULARITY_DESC: categories[1],
    SCORE_DESC: categories[2],
  };

  const initialCategory = categoryMap[userSearch.categoryValue || ""] || categories[0];
  const [category, setCategory] = useState<Category>(initialCategory);

  const handleCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    const { value } = selectedCategory || {};
    const newURL = `/discover?category=${value}`;
    router.push(newURL);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValues((prev) => ({
      ...prev,
      search: e.target.value,
    }));
    const newURL = `/discover?search=${e.target.value}`;
    router.push(newURL);
  };

  return {
    category,
    categories,
    handleCategory,
    handleSearch,
    setSearchValues,
    searchValues,
    error,
    loading,
    data,
  };
};

export default useSearch;
