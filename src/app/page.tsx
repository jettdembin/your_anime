export const metadata = {
	title: "Your Anime",
};

import { ContentLayout } from "../components/Layout/ContentLayout";

import Search from "../components/Search";
import Header from "../components/Pages/Home/Header";
import TopAnimeList from "../components/Pages/Home/TopAnimeList";
import Browse from "../components/Pages/Home/Browse";
import PopularAnime from "../components/Pages/Home/PopularAnime";

export default async function Home() {
	return (
		<div>
			<Header />

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<Search />

				<ContentLayout title="TRENDING NOW">
					<Browse />
				</ContentLayout>

				<ContentLayout title="ALL TIME POPULAR">
					<PopularAnime />
				</ContentLayout>

				<ContentLayout title="TOP 100 ANIME">
					<TopAnimeList />
				</ContentLayout>
			</main>
		</div>
	);
}
