import { ContentLayout } from "@/components/Layout/ContentLayout";

import Search from "@/components/Search";
import TopAnimeList from "@/components/Pages/Home/Layout/Main/TopAnimeList";
import Trending from "@/components/Pages/Home/Layout/Main/Trending";
import PopularAnime from "@/components/Pages/Home/Layout/Main/PopularAnime";

type Props = {};

export default function Main({}: Props) {
	return (
		<>
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
		</>
	);
}
