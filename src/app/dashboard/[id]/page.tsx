import axios from "axios";
import { auth, currentUser } from "@clerk/nextjs";
import UserData from "@/src/components/Pages/Dashboard/UserData";

// Function to either fetch user data or create a new user if they don't exist
async function getUserDataOrCreateUser(userId) {
	console.log(userId, "USERID");
	try {
		// Attempt to get the user's account data
		const accountDataResponse = await axios.get(
			`${process.env.BASE_URL}/api/getAccountData`,
			{
				params: { userId },
				headers: { "Cache-Control": "no-store" },
			}
		);

		// If successful, return the account data
		return accountDataResponse.data;
	} catch (error) {
		// If user does not exist, create the user
		if (error.response && error.response.status === 404) {
			// Here you would get the actual name and email from your authentication context or user input
			const user = await currentUser(); // Assumes currentUser() is synchronous or that you've handled the promise correctly elsewhere

			const userData = {
				userId,
				name: `${user.firstName} ${user.lastName}`, // Use actual names from your user context
				email: user.primaryEmailAddress?.emailAddress, // Use actual email from your user context
			};

			// Create the user
			const createUserResponse = await axios.post(
				`${process.env.BASE_URL}/api/createUser`,
				userData
			);
			return createUserResponse.data;
		} else {
			// Handle other errors
			throw error;
		}
	}
}

export default async function Dashboard() {
	const { userId } = auth();

	if (userId) {
		try {
			// Try to get or create user data
			const userData = await getUserDataOrCreateUser(userId);
			return (
				<div>
					<UserData data={userData} />
				</div>
			);
		} catch (error) {
			console.error("Error handling user data:", error);
			// Handle the error or display an error message
		}
	} else {
		// If there is no userId, handle accordingly, maybe redirect to login page
	}

	// Render nothing or a loading indicator until the user data is fetched/created
	return <div>Loading...</div>;
}
