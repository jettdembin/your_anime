import axios from "axios";
import { auth, currentUser } from "@clerk/nextjs";

import UserData from "@/src/components/Pages/Dashboard/UserData";

async function getAccountData(params: {}) {
	try {
		const res = await axios.get(`${process.env.BASE_URL}/api/getAccountData`, {
			params: params,
			headers: { "Cache-Control": "no-store" },
		});
		return res.data;
	} catch (error) {
		console.error("Error fetching account data: ", error);
		throw error;
	}
}

export default async function Dashboard() {
	// Get the userId from auth() -- if null, the user is not logged in
	const { userId } = auth();

	if (userId) {
		// Get the User object when you need access to the user's information
		const user = await currentUser();
		console.log(user);

		// Query DB for user specific information or display assets only to logged in users

		const data = await getAccountData({ userId });
		const { userData } = data;
		const { likes } = userData;
		return (
			<div>
				<UserData data={userData} />
			</div>
		);
	}
}

// <div key={userData.id}>
// 	<h1>{userData.name}</h1>
// 	{/* Render other user details */}
// </div>

// {likes?.map((like) => (
// 	<div key={like.id}>
// 		<p>Like Title: {like.title}</p>
// 		{/* Render other like details */}
// 	</div>
// ))}
