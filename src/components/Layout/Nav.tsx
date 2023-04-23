import Link from "next/link";
import Login from "../Elements/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Nav() {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<ul className="flex gap-60 text-gray-100">
			<li className="my-auto font-medium">AL</li>
			<div className="flex gap-10">
				<li className="my-auto font-medium cursor-pointer">Search</li>
				<li className="my-auto font-medium cursor-pointer">Social</li>
				<li className="my-auto font-medium cursor-pointer">Forum</li>
			</div>
			<div className="flex gap-4">
				<Login />
				<li>
					<button className="rounded-md bg-emerald-500 text-white px-3 py-1 font-medium">
						Sign Up
					</button>
				</li>
			</div>
		</ul>
	);
}
