import "@/src/styles/globals.css";
import Providers from "../util/providers";

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<Providers>{children}</Providers>
				{/* {children} */}
			</body>
		</html>
	);
}
