"use client";

import { useEffect, useState, useCallback } from "react";

import { useSearchParams } from "next/navigation";

import { useTrendingAnime } from "@/src/graphql/queries";

import { AnimeCardLayout } from "@/src/components/Layout/AnimeCardLayout";
import { useCardTypeContext } from "@/src/components/Pages/Discover/context/CardTypeContext";

import AnimeCard from "@/src/components/Pages/Home/ui/AnimeCard";
import { CardSectionLoader } from "@/src/components/Elements/LoadingSection";

import { debounce } from "@/src/components/Pages/Discover/utils";
import { useViewAll } from "@/src/components/Pages/Discover/hooks/useViewAll";
import FilterWidget from "@/src/components/Pages/Discover/ui/FilterWidget";
import Filter from "@/src/components/Elements/Filter";
import { useSearchContext } from "@/src/components/Pages/Discover/context/SearchContext";
import CategoryWidget from "@/src/components/Pages/Discover/ui/CategoryWidget";
import Widget from "@/src/components/Pages/Discover/ui/CategoryWidget/Widget";

export default function Discover() {
	const searchParams = useSearchParams();

	// const type = searchParams?.get("page");
	const searchValue = searchParams?.get("search");
	const categoryValue = searchParams?.get("category");
	// const isTrending = searchParams?.get("page") === "trending";

	const [page, setPage] = useState(1);
	const [media, setMedia] = useState([]);

	const { cardType } = useCardTypeContext();

	const { error, loading, data } = useViewAll(1, 50); // Updated to accept page as a parameter
	const { data: searchData } = useSearchContext();

	useEffect(() => {
		if (data && data.Trending && data.Trending.media) {
			setMedia((prevMedia) => [...prevMedia, ...data.Trending.media]);
		}
	}, [data]);

	const handleScroll = useCallback(
		debounce(() => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 1000
			) {
				setPage((prevPage) => prevPage + 1);
			}
		}, 300),
		[]
	); // 300ms delay

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [data, handleScroll]);

	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<section>
			<header className="flex justify-between items-center w-full pb-2">
				<div className="flex w-full items-center justify-between">
					{!!searchValue && <FilterWidget />}
					<CategoryWidget />
				</div>
				<hr className="h-10 mx-2 border-x border-y border-gray-800" />
				<div className="flex gap-1">
					<Widget cardType="card" />
					<Widget cardType="descriptive" />
					<Widget cardType="list" />
				</div>
			</header>
			{!searchValue ? (
				<AnimeCardLayout>
					{media.map((mediaItem, i) => (
						<AnimeCard key={i} media={mediaItem} cardType={cardType} />
					))}
				</AnimeCardLayout>
			) : (
				<AnimeCardLayout>
					{searchData?.Page?.media?.map((media, i) => (
						<AnimeCard key={i} media={media} cardType={cardType} />
					))}
				</AnimeCardLayout>
			)}
		</section>
	);
}
