import "@/src/styles/globals.css";
import Providers from "../util/providers";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Your Anime",
	description: "Your anime - just for you",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<head>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
					/>
				</head>
				<body className={inter.className}>
					<div className="flex flex-col h-screen">
						<Providers>
							<Navbar />
							{children}
							<Footer />
						</Providers>
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
