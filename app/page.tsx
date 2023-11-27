export const metadata = {
	title: "Your Anime",
};

import LandingPageContent from "@/components/Pages/Home/components/Layout/Main/components/Layout/LandingPageContent";
import Header from "@/components/Pages/Home/components/Layout/Header";
import Main from "@/components/Pages/Home/components/Layout/Main";

export default function Home() {
	return (
		<div>
			<Header />

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<LandingPageContent>
					<Main />
				</LandingPageContent>
			</main>
		</div>
	);
}
