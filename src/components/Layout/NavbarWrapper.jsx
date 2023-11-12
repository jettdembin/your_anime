import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import Navbar from "@/src/components/Layout/NavbarWrapper/Navbar";

// Function to either fetch user data or create a new user if they don't exist
async function getUserDataOrCreateUser(user) {
	const { id } = user || {};
	try {
		// Attempt to get the user's account data
		const accountDataResponse = await axios.get(
			`${process.env.BASE_URL}/api/getAccountData`,
			{
				params: { id },
				headers: { "Cache-Control": "no-store" },
			}
		);
		console.log("in try of catch");

		// If successful, return the account data
		return accountDataResponse.data;
	} catch (error) {
		// If user does not exist, create the user
		if (error.response.createUser) {
			const userData = {
				id,
				name: `${user?.firstName} ${user?.lastName}`, // Use actual names from your user context
				email: user?.emailAddresses[0]?.emailAddress, // Use actual email from your user context
			};

			// Create the user
			const createUserResponse = await axios.post(
				`${process.env.BASE_URL}/api/createUser`,
				userData
			);
			return createUserResponse.data;
		}
	}
}

export default async function NavbarWrapper() {
	const user = await currentUser();
	const userData = await getUserDataOrCreateUser(user);

	return (
		<div>
			<Navbar userData={userData || {}} />{" "}
		</div>
	);
}
