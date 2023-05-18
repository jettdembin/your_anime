type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
	return (
		<>
			<div>
				<div className="max-w-7xl py-6">
					<h1 className="text-lg font-semibold text-gray-900">{title}</h1>
				</div>
				<div className="max-w-7xl mx-auto">{children}</div>
			</div>
		</>
	);
};
