"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation"; // Corrected from 'next/navigation' to 'next/router'

import { GET_TRENDING } from "@/graphql/queries";
import { useAnilistAPI } from "@/hooks/useAnilistAPI";

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
  const searchParams = useSearchParams();

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
  }, [gqlQuery, query]);

  const { error, loading, data } = useAnilistAPI(gqlQuery ?? "", searchValues);

  const handleCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);

    const { value } = selectedCategory || {};

    if (params) {
      const search = searchParams?.get("search") || "";

      params.set("category", value);
      !!search && params.set("search", search);

      const newURL = `/discover?${params.toString()}`;
      router.push(newURL);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newParams = new URLSearchParams(window?.location?.search);

    newParams.set("search", e.target.value);
    const newURL = `/discover?${newParams.toString()}`;
    router.push(newURL, undefined);
    // router.push(newURL, undefined, {
    //   shallow: true,
    // });

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
