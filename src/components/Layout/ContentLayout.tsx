"use client";

import { useRouter } from "next/navigation";

type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
	page: string;
};

export const ContentLayout = ({
	children,
	title,
	page,
}: ContentLayoutProps) => {
	const router = useRouter();

	return (
		<>
			<section className="xl:mt-16">
				<header className="max-w-7xl flex items-end justify-between py-6">
					<h1 className="text-lg font-semibold text-gray-900">{title}</h1>
					<h6
						className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-600 cursor-pointer"
						onClick={(e) => {
							// router.push("/discover?search=" + e.target.value, undefined, {
							// 	shallow: true,
							// });
							router.push(`/discover?page=${page}`, undefined, {
								shallow: true,
							});
						}}
					>
						View All
					</h6>
				</header>
				<main className="max-w-7xl mx-auto">{children}</main>
			</section>
		</>
	);
};
