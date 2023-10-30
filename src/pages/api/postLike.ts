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
					AND: [{ animeId: animeId }, { likeId: userId }],
				},
			});

			// If a like doesn't exist, create one
			if (!existingLike) {
				const newLike = await prisma.like.create({
					data: {
						title: animeTitle,
						animeId: animeId,
						likeId: userId,
					},
				});

				await prisma.user.update({
					where: { id: userId },
					data: {
						likes: {
							connect: [{ animeId: newLike.animeId }],
						},
					},
				});

				res.status(200).json(newLike);
			} else {
				res.status(409).json({ message: "Already in your likes 😁" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
