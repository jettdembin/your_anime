type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
	return (
		<>
			<div>
				<div className="max-w-7xl sm:px-6 md:px-8 py-6">
					<h1 className="text-lg font-semibold text-gray-900">{title}</h1>
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
			</div>
		</>
	);
};
