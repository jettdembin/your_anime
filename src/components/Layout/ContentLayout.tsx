type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
	return (
		<>
			<section className="xl:mt-16">
				<header className="max-w-7xl flex items-end justify-between py-6">
					<h1 className="text-lg font-semibold text-gray-900">{title}</h1>
					<h6 className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-600 cursor-pointer">
						View All
					</h6>
				</header>
				<main className="max-w-7xl mx-auto">{children}</main>
			</section>
		</>
	);
};
