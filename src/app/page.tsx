export const metadata = {
	title: "Your Anime",
};

import { ContentLayout } from "../components/Layout/ContentLayout";

import Search from "../components/Search";
import Header from "../components/Pages/Home/Header";
import TopAnimeList from "../components/Pages/Home/TopAnimeList";
import Trending from "../components/Pages/Home/Trending";
import PopularAnime from "../components/Pages/Home/PopularAnime";

export default async function Home() {
	return (
		<div>
			<Header />

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<Search />

				<ContentLayout title="TRENDING NOW" page="trending">
					<Trending />
				</ContentLayout>

				<ContentLayout title="ALL TIME POPULAR" page="alltime">
					<PopularAnime />
				</ContentLayout>

				<ContentLayout title="TOP 100 ANIME" page="top">
					<TopAnimeList />
				</ContentLayout>
			</main>
		</div>
	);
}
