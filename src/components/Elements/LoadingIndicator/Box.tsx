import { ComponentPropsWithRef } from "react";

// React 18 example
// Use the div element props
type DivProps = ComponentPropsWithRef<"div">;

// Define the component. this is basically a div wrapper with a pulse animation for the skeleton loading
const SkeletonLoader: React.FC<DivProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={["animate-pulse", className].join(" ")} {...props}>
			{children}
		</div>
	);
};

export const TestLoader = () => {
	return (
		<div className="container mx-auto">
			<SkeletonLoader className="flex gap-2 my-2 w-80">
				<div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0"></div>
				<div className="w-full flex flex-col gap-2">
					<div className="h-5 bg-gray-200"></div>
					<div className="h-5 w-1/2 bg-gray-200"></div>
				</div>
			</SkeletonLoader>
		</div>
	);
};
export default SkeletonLoader;
