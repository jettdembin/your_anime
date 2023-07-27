"use client";

import { useSearchParams } from "next/navigation";

import { useCardTypeContext } from "@/src/components/Pages/Discover/context/CardTypeContext";
import useCardType from "@/src/components/Pages/Discover/hooks/useCardType";

export default async function Discover() {
	const cardType = useCardTypeContext();

	const searchParams = useSearchParams();

	const search = searchParams.get("search");
	const page = searchParams.get("page");

	const { error, loading, data } = useTrendingAnime();

	if (loading) return <CardSectionLoader />;
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	// return (
	// 	<AnimeCardLayout>
	// 		{data.Trending.media.slice(0, 8)?.map((media: Media, i: number) => (
	// 			<AnimeCard key={i} media={media} />
	// 		))}
	// 	</AnimeCardLayout>
	// );

	return (
		<section>
			<header className="flex items-center justify-end">
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
					<h6>TRENDING</h6>
				</div>
				<div className="flex gap-2">
					<i>icon</i>
					<i>icon</i>
					<i>icon</i>
				</div>
			</header>
		</section>
	);
}
