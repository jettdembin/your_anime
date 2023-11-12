"use client";

import { useEffect } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios` or `yarn add axios`
import { useAuthContext } from "@/src/context/AuthContext";
import Top10Likes from "@/src/components/Pages/Dashboard/Top10Likes";

const UserData = ({ data }) => {
	const { auth, setAuth } = useAuthContext();

	useEffect(() => {
		setAuth(data);
	}, [data, setAuth]);

	const { likes } = auth || {};

	return (
		<div>
			<section className="py-8">
				<div className="bg-white py-4">
					<div className="flex flex-col items-center">
						<h2 className="text-xl text-[#4ad3fc]">1</h2>
						<h4 className="text-sm font-semibold">Total Aniasdmess</h4>
					</div>
				</div>
			</section>
			<main>
				<Top10Likes likes={likes} />
			</main>
		</div>
	);
};

export default UserData;
