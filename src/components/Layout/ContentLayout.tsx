type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
	return (
		<>
			<section className="xl:mt-16">
				<header className="max-w-7xl py-6">
					<h1 className="text-lg font-semibold text-gray-900">{title}</h1>
				</header>
				<main className="max-w-7xl mx-auto">{children}</main>
			</section>
		</>
	);
};
