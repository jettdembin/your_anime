import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { likes, userId } = req.body;
		// debugger;
		try {
			// Iterate over the likes to create or update TopAnime entries
			for (const [index, like] of likes.entries()) {
				const { animeId, title, rating } = like;
				// console.log(like);
				// console.log(index);

				// Check and create/update TopAnime for each like
				const existingTopAnime = await prisma.topAnime.findFirst({
					where: {
						AND: [{ animeId: animeId }, { userId: userId }],
					},
				});

				if (!existingTopAnime) {
					// Create a new TopAnime entry if it doesn't exist
					await prisma.topAnime.create({
						data: {
							title: title,
							animeId,
							userId,
							rating,
							rank: index + 1, // Rank based on the index in likes
						},
					});
				} else {
					// Update the rank if the TopAnime already exists
					const upatedAnime = await prisma.topAnime.update({
						where: { id: existingTopAnime.id },
						data: { rank: index + 1 },
					});
					// console.log(upatedAnime, "upatedAnime");
				}
			}

			// Respond with a success message
			res.status(200).json({ message: "Top Anime list updated successfully" });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		// If the HTTP method is not POST, send a method not allowed response
		res.status(405).json({ message: "Method not allowed" });
	}
}
