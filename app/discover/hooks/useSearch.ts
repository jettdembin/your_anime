// useSearch.js

"use client";

import { GET_TRENDING } from "@/graphql/queries";
import { useAnilistAPI } from "@/hooks/useAnilistAPI";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserSearch = {
  search?: string;
  categoryValue?: string;
  query?: any;
  variables: any;
};

type Category = {
  label: string;
  value: string;
};

const useSearch = (userSearch: UserSearch) => {
  const router = useRouter();

  const [gqlQuery, setGqlQuery] = useState(userSearch.query ?? GET_TRENDING);
  const [searchValues, setSearchValues] = useState({
    search: userSearch.search,
    status: null,
    season: null,
    year: null,
    sort: null,
  });

  useEffect(() => {
    if (userSearch.query && gqlQuery !== userSearch.query) {
      setGqlQuery(userSearch.query);
    }
  }, [userSearch.query, gqlQuery]);

  const { error, loading, data } = useAnilistAPI(gqlQuery, userSearch.variables);
  //debugger;

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
    const { value } = selectedCategory || {};
    setCategory(selectedCategory);

    const newParams = new URLSearchParams(window?.location?.search);
    
    newParams.set("category", value);
    const newURL = `/discover?${newParams.toString()}`;
    router.push(newURL);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(window?.location?.search);

    newParams.set("search", e.target.value);
    const newURL = `/discover?${newParams.toString()}`;
    router.push(newURL);

    setSearchValues((prev: any) => ({
      ...prev,
      search: e.target.value,
    }));
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
