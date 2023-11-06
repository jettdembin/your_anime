import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { animeId, animeTitle, userId } = req.body;

			// Check if a like already exists for the given animeId and userId
			const existingLike = await prisma.like.findFirst({
				where: {
					AND: [{ animeId: animeId }, { user: { id: userId } }],
				},
			});

			// If a like doesn't exist, create one and connect it to the user
			if (!existingLike) {
				const newLike = await prisma.like.create({
					data: {
						title: animeTitle,
						animeId: animeId,
						userId: userId,
					},
				});

				// The relationship between the new Like and the User is established
				// in the `create` operation above, so no need for a separate `update` operation.
				res.status(200).json(newLike);
			} else {
				// If the like already exists, send a conflict response
				res.status(409).json({ message: "Already in your likes 😁" });
			}
		} catch (err) {
			// If there's an error, log it and send a server error response
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		// If the HTTP method is not POST, send a method not allowed response
		res.status(405).json({ message: "Method not allowed" });
	}
}
