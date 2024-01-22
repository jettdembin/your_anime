export const metadata = {
  title: "Your Anime",
};

import Header from "@/app/components/Header";
import LandingPageContent from "@/app/components/LandingPageContent";
import PopularAnime from "@/app/components/PopularAnime";
import TopAnimeList from "@/app/components/TopAnimeList";
import Trending from "@/app/components/Trending";
import { ContentLayout } from "@/layout/ContentLayout";
import SearchWrapper from "./components/SearchWrapper";
import ThisSeason from "./components/ThisSeason";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />

      <main className="relative mt-32 md:mt-6">
        <LandingPageContent>
          <SearchWrapper />

          <div className="mx-2 md:mx-0">
            <ContentLayout title="WINTER 2024" category="THIS_SEASON">
              <ThisSeason />
            </ContentLayout>

            <ContentLayout title="TRENDING NOW" category="TRENDING">
              <Trending />
            </ContentLayout>

            <ContentLayout title="ALL TIME POPULAR" category="POPULAR_ANIME">
              <PopularAnime />
            </ContentLayout>

            <ContentLayout title="TOP 100 ANIME" category="TOP_100">
              <TopAnimeList />
            </ContentLayout>
          </div>
        </LandingPageContent>
      </main>
    </div>
  );
}
