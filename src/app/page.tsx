export const metadata = {
	title: "Your Anime",
};

import Nav from "../components/Layout/Nav";
import { ContentLayout } from "../components/Layout/ContentLayout";

import Header from "../components/Pages/Home/Header";
import TopAnimeList from "../components/Pages/Home/TopAnimeList";
import Browse from "../components/Pages/Home/Browse";
import Trending from "../components/Trending";
import PopularAnime from "../components/Pages/Home/PopularAnime";
import Search from "../components/Search";
import Footer from "../components/Layout/Footer";

export default async function Home() {
	return (
		<div>
			<Nav />
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

			<Footer />
		</div>
	);
}
