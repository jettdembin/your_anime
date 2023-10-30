"use client";

import { useAuthContext } from "@/src/context/AuthContext";

const UserData = ({ data }) => {
	console.log(data, "data");
	const { setAuth } = useAuthContext();
	useEffect(() => {
		setAuth(data);
	}, [data]);
	return <div></div>;
};

export default UserData;
