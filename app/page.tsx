export const metadata = {
  title: "Your Anime",
};

import Header from "@/app/components/Header";
import LandingPageContent from "@/app/components/LandingPageContent";
import PopularAnime from "@/app/components/PopularAnime";
import TopAnimeList from "@/app/components/TopAnimeList";
import Trending from "@/app/components/Trending";
import { ContentLayout } from "@/layout/ContentLayout";
import Search from "@/ui/Search";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="relative">
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
