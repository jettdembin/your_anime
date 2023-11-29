import Link from "next/link";

import UserNavigation from "./UserNavigation";

export default function Navbar() {
	return (
		<nav
			className={`w-full p-6 bg-gray-800 items-center justify-center fixed top-0 z-50`}
			id="navbar"
		>
			<div className="container mx-auto">
				<ul className="flex justify-between gap-6 text-gray-100">
					<li
						className="my-auto font-medium cursor-pointer"
						// onClick={() => {
						// 	router.push(`/`, undefined, {
						// 		shallow: true,
						// 	});
						// }}
					>
						<Link href={`/`}>YAnime</Link>
					</li>
					<div className="flex gap-10">
						<li className="my-auto font-medium cursor-pointer">Search</li>
						<li className="my-auto font-medium8i6 cursor-pointer">Social</li>
						<li className="my-auto font-medium cursor-pointer">Forum</li>
					</div>

					<div className="flex gap-4">
						<UserNavigation />
					</div>
				</ul>
			</div>
		</nav>
	);
}
