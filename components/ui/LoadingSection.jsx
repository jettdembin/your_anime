// Define the component. this is basically a div wrapper with a pulse animation for the skeleton loading
const SkeletonLoader = ({ children, className, ...props }) => {
	return (
		<div
			className={[
				"bg-shine-effect bg-no-repeat bg-200% animate-pulse",
				className,
			].join(" ")}
			{...props}
		>
			{children}
		</div>
	);
};

// const circleLoader = (
// 	<div className="h-12 w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
// );

const searchLoader = <div className="h-16 w-full bg-gray-700"></div>;

const filterLoader = <div className="w-24 h-16 bg-gray-700"></div>;

const selectLoader = (
	<div className="h-10 w-full bg-gray-700 bg-shine-effect bg-no-repeat bg-200% animate-shine"></div>
);

const selectLoaders = (
	<div className="w-full flex gap-6 mt-8">
		{selectLoader} {selectLoader} {selectLoader} {selectLoader}
	</div>
);

const boxLoader = (
	<div className="relative w-full h-48 bg-gray-700 bg-shine-effect bg-no-repeat bg-200% animate-shine rounded-md overflow-hidden group"></div>
);

export const CardSectionLoader = () => {
	return (
		<SkeletonLoader className="">
			<div className="w-full flex flex-col gap-2">
				{/* <div className="flex gap-8">
					{searchLoader}
					{filterLoader}
				</div>
				{selectLoaders} */}
				<section className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4">
					{boxLoader}
					{boxLoader}
					{boxLoader}
					{boxLoader} {boxLoader}
					{boxLoader}
					{boxLoader}
					{boxLoader}
				</section>
			</div>
		</SkeletonLoader>
	);
};
export default SkeletonLoader;
