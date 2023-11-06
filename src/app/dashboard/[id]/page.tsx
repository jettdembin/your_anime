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
		const { firstName, lastName, id, primaryEmailAddressId } = user;
		console.log(user, "USER");

		const createUser = async () => {
			try {
				const response = await axios.post(
					`${process.env.BASE_URL}/api/createUser`,
					{
						userId: id,
						name: firstName + " " + lastName,
						email: primaryEmailAddressId,
					}
				);
				return response.data;
				// Perform any actions on successful user creation, like updating context or state
			} catch (error) {
				console.error("Error creating user:", error);
			}
		};

		const userData = await createUser();

		return (
			<div>
				<UserData data={userData} />
			</div>
		);
		// Query DB for user specific information or display assets only to logged in users
		// const data = await getAccountData({ userId });
		// const { userData } = data;
		// const { likes } = userData;
		// return (
		// 	<div>
		// 		<UserData data={userData} />

		// 	</div>
		// );
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
