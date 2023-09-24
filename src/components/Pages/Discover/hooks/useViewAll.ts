"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useAnilistAPI } from "@/src/hooks/useAnilistAPI";
import { GET_POPULAR_ANIME, GET_TRENDING } from "@/src/graphql/queries";

const useViewAll = (page: number, perPage: number) => {
	const searchParams = useSearchParams();

	const viewingPage = searchParams?.get("page") || "";

	// const [viewing, setViewing] = useState<string | null>(viewingPage);

	let query;

	if (viewingPage == "trending") {
		query = GET_TRENDING;
	}
	if (viewingPage == "popular") {
		query = GET_POPULAR_ANIME;
	}
	if (!viewingPage) {
		query = GET_TRENDING;
	}
	// debugger;

	const { error, loading, data } = useAnilistAPI(page, perPage, query);

	return { error, loading, data };
};

export { useViewAll };
