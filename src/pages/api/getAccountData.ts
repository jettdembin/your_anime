// api/getAccountData.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const userId = req.query.userId as string; // Extract userId from query string

			if (!userId) {
				res.status(400).json({ error: "UserId is required" });
				return;
			}

			// Retrieve user data by ID
			const userData = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					likes: true, // Eager-load related 'Like' records
				},
			});

			if (!userData) {
				res.status(404).json({ error: "User not found" });
				return;
			}

			res.status(200).json({ userData });
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" }); // Handle methods other than GET
	}
}
