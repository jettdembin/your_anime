import "@/src/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "../util/providers";

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
	session,
	...pageProps
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<SessionProvider session={session}>
					<Providers>{children}</Providers>
				</SessionProvider>
			</body>
		</html>
	);
}
