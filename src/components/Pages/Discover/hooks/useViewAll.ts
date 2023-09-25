"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { GET_POPULAR_ANIME, GET_TRENDING } from "@/src/graphql/queries";

const useViewAll = (page: number, perPage: number) => {
	const searchParams = useSearchParams();

	const category = searchParams?.get("category") || "";

	// const [viewing, setViewing] = useState<string | null>(viewingPage);

	let query;

	if (category == "trending") {
		query = GET_TRENDING;
	}
	if (category == "popular") {
		query = GET_POPULAR_ANIME;
	}
	if (!category) {
		query = GET_TRENDING;
	}
	// debugger;

	const { error, loading, data } = useAnilistAPI(query);

	return { error, loading, data };
};

export { useViewAll };
