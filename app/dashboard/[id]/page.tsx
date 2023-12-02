import axios from "axios";

import { useRouter } from "next/router";
import { currentUser } from "@clerk/nextjs";
import UserData from "@/components/Pages/Dashboard/UserData";
import { ToastContainer } from "react-toastify";
import Main from "@/components/Pages/Dashboard/components/Layout/Main";

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
		console.log(accountDataResponse.data, "user data");

		// If successful, return the account data
		return accountDataResponse.data;
	} catch (error) {
		// If user does not exist, create the user
		if (error.response?.createUser) {
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

export default async function Dashboard() {
	const user = await currentUser();

	const userData = await getUserDataOrCreateUser(user);

	return (
		<div>
			<header className="text-white">
				<div
					className="hero height-[400px]"
					style={{
						backgroundImage:
							"url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
					}}
				>
					<div className="hero-overlay bg-opacity-60"></div>
					<div className="container m-auto hero-content text-center text-neutral-content">
						<div className="">
							{/* Profile Section */}
							<div className="w-full  py-4">
								<div className="bg-white p-6 rounded-lg shadow-md">
									<div className="flex flex-col md:flex-row md:items-center">
										<img
											className="w-32 h-32 rounded-full mx-auto md:mx-0"
											src="https://via.placeholder.com/150"
											alt="User Avatar"
										/>
										<div className="mt-4 md:mt-0 md:ml-6">
											<h2 className="text-lg font-bold">Username</h2>
											<p className="text-gray-600">
												User description or bio goes here...
											</p>
											{/* Additional user info */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div
					className="banner bg-[#242538] w-full h-[400px] -mt-12 relative"
					style={{
						// background: `url(${})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "50% 35%",
					}}
				>
					<div
						className="absolute inset-0 bg-opacity-50 bg-black shadow-inner"
						style={{
							background:
								"linear-gradient(180deg,rgba(10, 10, 10, 0) 40%,rgba(10, 10, 10, 0.6))",
						}}
					></div>
				</div> */}
				<div className="bg-white text-slate-800 font-bold">
					<div className="container m-auto ">
						<ul className="flex justify-between py-2">
							<li className="hover:text-[#4ad3fc] cursor-pointer">
								<p className="px-12">Overview</p>
							</li>
							<li className="hover:text-[#4ad3fc] cursor-pointer">
								<p className="px-12">Favorites</p>
							</li>
							<li className="hover:text-[#4ad3fc] cursor-pointer">
								<p className="px-12">Reviews</p>
							</li>
						</ul>
					</div>
				</div>
			</header>

			<main>
				<Main data={userData} />
				{/* <div className="container m-auto">
          <UserData data={userData} />
        </div> */}
			</main>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}