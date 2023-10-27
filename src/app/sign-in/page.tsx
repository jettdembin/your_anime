import { SignIn, auth, currentUser } from "@clerk/nextjs";

export default async function Page() {
	// Get the userId from auth() -- if null, the user is not logged in
	const { userId } = auth();

	if (userId) {
		// Query DB for user specific information or display assets only to logged in users
	}

	// Get the User object when you need access to the user's information
	const user = await currentUser();

	return (
		<div className="overflow-hidden">
			{console.log("Rendering SignIn component")}
			<div className="fixed w-screen h-screen top-0 left-0 bg-gray-600 z-10 opacity-75"></div>
			<div className="fixed w-screen h-screen z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
				<div>
					<SignIn />
				</div>
			</div>
		</div>
	);
}
