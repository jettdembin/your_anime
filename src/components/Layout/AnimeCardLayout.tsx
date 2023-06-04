type AnimeCardLayoutProps = {
	children: React.ReactNode;
};

export const AnimeCardLayout = ({ children }: AnimeCardLayoutProps) => {
	return (
		<>
			<section className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4">
				{children}
			</section>
		</>
	);
};
