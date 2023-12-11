"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Corrected from 'next/navigation' to 'next/router'
import { useAnilistAPI } from "@/hooks/useAnilistAPI";
import { GET_TRENDING } from "@/graphql/queries";

// Define a type for the userSearch parameter
type UserSearch = {
  searchValue?: string;
  categoryValue?: string;
  query?: any; // Update this with the specific type of your query if needed
};

// Define a type for the category
type Category = {
  label: string;
  value: string;
};

const useSearch = (userSearch: UserSearch) => {
  const router = useRouter();
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, []);

  const { searchValue, categoryValue, query } = userSearch || {};

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

  const initialCategory = categoryMap[categoryValue || 0] || categories[0];

  const [category, setCategory] = useState<Category>(initialCategory);

  const [searchValues, setSearchValues] = useState({
    search: searchValue,
    status: null,
    season: null,
    year: null,
  });

  const [gqlQuery, setGqlQuery] = useState(query ?? GET_TRENDING);

  useEffect(() => {
    if (!!query && gqlQuery !== query) {
      setGqlQuery(query);
    }
  }, [query]);

  const { error, loading, data } = useAnilistAPI(gqlQuery ?? "", searchValues);

  const handleCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);

    const { value } = selectedCategory || {};

    if (params) {
      params.set("category", value);
      const newURL = `/discover?${params.toString()}`;
      router.push(newURL);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(window?.location?.search);

    newParams.set("search", e.target.value);
    const newURL = `/discover?${newParams.toString()}`;
    router.push(newURL, undefined, {
      shallow: true,
    });

    setSearchValues((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  useEffect(() => {
    if (!!searchValue) {
      setSearchValues((prev) => ({ ...prev, search: searchValue }));
    }
  }, [searchValue, categoryValue]);

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
