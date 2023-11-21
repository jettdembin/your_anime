// pages/api/getUsers.js or /pages/api/users/index.js

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client"; // Ensure this path correctly points to your Prisma client setup.

// Handler for the GET /api/getUsers endpoint
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		// If the request method is not GET, return 405 Method Not Allowed
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		// Fetch all users from the database
		const users = await prisma.user.findMany({
			// You can customize the `select` or `include` to return specific fields
			// select: {
			//   id: true,
			//   name: true,
			//   email: true,
			//   // Add other fields you want to include in the response
			// },
		});

		// Respond with the list of users
		res.status(200).json(users);
	} catch (error) {
		// Log and return any server errors
		console.error("Request error", error);
		res
			.status(500)
			.json({ error: "Error fetching users", errorMessage: error.message });
	}
}
