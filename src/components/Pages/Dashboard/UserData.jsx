"use client";

import { useEffect } from "react";

import { useAuthContext } from "@/src/context/AuthContext";

const UserData = ({ data }) => {
	console.log(data, "data");
	const { auth, setAuth } = useAuthContext();
	useEffect(() => {
		setAuth(data);
		debugger;
	}, [data]);

	const { likes } = auth || {};
	return (
		<div>
			{likes?.map((like) => (
				<h1>{like?.title}</h1>
			))}
		</div>
	);
};

export default UserData;
