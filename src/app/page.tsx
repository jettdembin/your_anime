export const metadata = {
	title: "Your Anime",
};

import { ContentLayout } from "../components/Layout/ContentLayout";

import Search from "../components/Search";
import Header from "../components/Pages/Home/Header";
import TopAnimeList from "../components/Pages/Home/TopAnimeList";
import Trending from "../components/Pages/Home/Trending";
import PopularAnime from "../components/Pages/Home/PopularAnime";
import LandingPageContent from "../components/Pages/Home/LandingPageContent";

export default function Home() {
	return (
		<div>
			<Header />

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<LandingPageContent>
					<Search />

					<ContentLayout title="TRENDING NOW" category="TRENDING">
						<Trending />
					</ContentLayout>

					<ContentLayout title="ALL TIME POPULAR" category="POPULAR_ANIME">
						<PopularAnime />
					</ContentLayout>

					<ContentLayout title="TOP 100 ANIME" category="TOP_100">
						<TopAnimeList />
					</ContentLayout>
				</LandingPageContent>
			</main>
		</div>
	);
}
