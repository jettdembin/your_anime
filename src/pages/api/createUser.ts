import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client"; // make sure this path is correct for your project setup

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		// Extract user data from request body
		const { name, email, id } = req.body;

		// Create new user
		const user = await prisma.user.create({
			data: {
				name,
				email,
				id,
				// You can add other fields here as needed
			},
		});

		// Respond with the created user data
		console.log(user, "Respond with the created user data");
		res.status(201).json(user);
	} catch (error) {
		console.error("Request error", error);
		res
			.status(500)
			.json({ error: "Error creating user", errorMessage: error.message });
	}
}
