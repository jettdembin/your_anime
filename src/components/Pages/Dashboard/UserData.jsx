"use client";

import { useEffect } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios` or `yarn add axios`
import { useAuthContext } from "@/src/context/AuthContext";
import Top10Likes from "@/src/components/Pages/Dashboard/Top10Likes";

const UserData = ({ data }) => {
	const { setAuth } = useAuthContext();

	useEffect(() => {
		setAuth(data);
	}, [data, setAuth]);

	const { likes, topAnimes } = data || {};
	debugger;

	return (
		<div>
			<section className="mt-8 mb-14">
				<div className="bg-white py-4">
					<div className="flex flex-col items-center">
						<h2 className="text-xl text-[#4ad3fc]">
							{!!likes?.length ? likes.length : 0}
						</h2>
						<h4 className="text-sm font-semibold">Total Anime</h4>
					</div>
				</div>
			</section>

			<section>
				<Top10Likes likes={likes} topAnimes={topAnimes} />
			</section>
		</div>
	);
};

export default UserData;
