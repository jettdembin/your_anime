import { ContentLayout } from "@/components/Layout/ContentLayout";

import Search from "@/components/Search";
import Trending from "./Main/components/Layout/Trending";
import PopularAnime from "./Main/components/Layout/PopularAnime";
import TopAnimeList from "./Main/components/Layout/TopAnimeList";

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
