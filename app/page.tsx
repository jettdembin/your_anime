export const metadata = {
  title: "Your Anime",
};

import { ContentLayout } from "@/layout/ContentLayout";
import Header from "@/app/components/Header";
import LandingPageContent from "@/app/components/LandingPageContent";
import PopularAnime from "@/app/components/PopularAnime";
import TopAnimeList from "@/app/components/TopAnimeList";
import Trending from "@/app/components/Trending";
import Search from "@/components/Search";

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
