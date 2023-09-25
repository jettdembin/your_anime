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

export default function Discover() {
	const searchParams = useSearchParams();

	// const type = searchParams?.get("page");
	const searchValue = searchParams?.get("search");
	const category = searchParams?.get("category");
	// const isTrending = searchParams?.get("page") === "trending";

	const [page, setPage] = useState(1);
	const [media, setMedia] = useState([]);

	const { cardType } = useCardTypeContext();

	const { error, loading, data } = useViewAll(category, 50); // Updated to accept page as a parameter
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

	useEffect(() => {
		console.log(searchData, "searchData");
	}, [searchData]);

	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	// if (data)
	// if (loading && page > 1)
	return (
		<section>
			<header className="flex justify-between items-center w-full pb-2">
				<div className="flex w-full items-center justify-between">
					{!!searchValue && <FilterWidget />}
					<CategoryWidget />
				</div>
				<div className="flex gap-2">
					<svg
						clipRule="evenodd"
						fillRule="evenodd"
						strokeLinejoin="round"
						strokeMiterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m8 16h-5v4c0 .621.52 1 1 1h4zm6.6 5v-5h-5.2v5zm6.4-5h-5v5h4c.478 0 1-.379 1-1zm0-1.4v-5.2h-5v5.2zm-18-5.2v5.2h5v-5.2zm11.6 0h-5.2v5.2h5.2zm1.4-6.4v5h5v-4c0-.478-.379-1-1-1zm-8 5v-5h-4c-.62 0-1 .519-1 1v4zm6.6-5h-5.2v5h5.2z"
							fillRule="nonzero"
						/>
					</svg>
					<i>icon</i>
					<i>icon</i>
					<i>icon</i>
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
					{searchData?.Page?.media?.slice(0, 8)?.map((media, i) => (
						<AnimeCard key={i} media={media} cardType={cardType} />
					))}
				</AnimeCardLayout>
			)}
		</section>
	);
}
