"use client";

import { useEffect } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios` or `yarn add axios`
import { useAuthContext } from "@/src/context/AuthContext";

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
						<h4 className="text-sm font-semibold">Total Anime</h4>
					</div>
				</div>
			</section>
			{likes?.map((like, index) => (
				<h1 key={index}>{like?.title}</h1>
			))}
		</div>
	);
};

export default UserData;
