import Login from "../Elements/Login";

export default async function Nav() {
	return (
		<nav className="hidden lg:flex h-20 px-8 bg-gray-800  items-center justify-center relative">
			<ul className="flex gap-60 text-gray-100">
				<li className="my-auto font-medium">YAnime</li>
				<div className="flex gap-10">
					<li className="my-auto font-medium cursor-pointer">Search</li>
					<li className="my-auto font-medium cursor-pointer">Social</li>
					<li className="my-auto font-medium cursor-pointer">Forum</li>
				</div>
				<div className="flex gap-4">
					<Login />
					<li>
						<button className="rounded-md bg-blue-500 text-white px-3 py-1 font-medium">
							Sign Up
						</button>
					</li>
				</div>
			</ul>
		</nav>
	);
}
