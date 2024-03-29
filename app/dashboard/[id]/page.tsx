import axios, { AxiosError } from "axios";

import { currentUser } from "@clerk/nextjs";
// import { ToastContainer } from "react-toastify";

import UserProfile from "./components/UserProfile";

export const dynamic = "force-dynamic";

type UserType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: any;
  emailAddresses?: any;
};

// Function to either fetch user data or create a new user if they don't exist
async function getUserDataOrCreateUser(user: UserType | null) {
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
    // If successful, return the account data
    return accountDataResponse.data;
  } catch (error) {
    const axiosError = error as AxiosError | any;
    // If user does not exist, create the user
    if (axiosError.response && axiosError.response.data.createUser) {
      const userData: UserType = {
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
  const user: any = await currentUser();

  const userData = await getUserDataOrCreateUser(user);

  return (
    <div>
      <header className="text-white">
        <div
          className=""
          style={{
            backgroundImage: "url(/dashboard-banner.jpg)",
            backgroundSize: "contain",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="h-80 container m-auto hero-content text-center text-neutral-content">
            <div className="">
              {/* Profile Section */}
              {/* <div className="w-full  py-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <Image
                      width={32}
                      height={32}
                      className="rounded-full mx-auto md:mx-0"
                      src="https://via.placeholder.com/150"
                      alt="User Avatar"
                    />
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <h2 className="text-lg font-bold">{userData?.name}</h2>

                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bg-white text-slate-800 font-bold">
          {/* <div className="container m-auto ">
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
          </div> */}
        </div>
      </header>
      <main>
        {/* <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">Item 1</div>
            <div className="bg-white p-4 rounded-lg shadow-md">Item 2</div>
            <div className="bg-white p-4 rounded-lg shadow-md">Item 3</div>
          </div>
        </div> */}
        <div className="container m-auto">
          <UserProfile data={userData} />
        </div>
      </main>
      {/* <ToastContainer
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
      /> */}
    </div>
  );
}
