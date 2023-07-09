import Search from "@/src/components/Search";

import { CardTypeProvider } from "@/src/components/Pages/Discover/context/CardTypeContext";

export default async function DiscoverLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			{/* <CardTypeProvider> */}
			<header className="max-w-7xl md:mx-20 xl:mx-auto relative">
				<Search />
			</header>

			<main className="max-w-7xl md:mx-20 xl:mx-auto relative">{children}</main>
			{/* </CardTypeProvider> */}
		</div>
	);
}
