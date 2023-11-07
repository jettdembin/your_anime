"use client";

import { useEffect } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios` or `yarn add axios`
import { useAuthContext } from "@/src/context/AuthContext";

const UserData = ({ data }) => {
	console.log(data, "data");
	const { auth, setAuth } = useAuthContext();

	useEffect(() => {
		setAuth(data.userData);
		debugger;
	}, [data, setAuth]);

	const { likes } = auth || {};

	return (
		<div>
			{likes?.map((like, index) => (
				<h1 key={index}>{like?.title}</h1>
			))}
		</div>
	);
};

export default UserData;
