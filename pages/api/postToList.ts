import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

type PostToListRequestBody = {
	animeId: string;
	animeTitle: string;
	userId: string;
	rating: number;
	listType: "WATCHED" | "WATCHING" | "TO_WATCH";
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const {
			animeId,
			animeTitle,
			userId,
			rating,
			listType,
		}: PostToListRequestBody = req.body;

		if (!userId || !listType || !animeId) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		try {
			// Retrieve the user's list or create it if it doesn't exist
			let userList = await prisma.list.findFirst({ where: { userId: userId } });
			if (!userList) {
				userList = await prisma.list.create({ data: { userId: userId } });
			}

			// Check if the anime is already in the requested list related to the User
			const existingEntry = await prisma[listType.toLowerCase()].findFirst({
				where: { animeId: animeId, userId: userId },
			});

			if (existingEntry) {
				return res
					.status(409)
					.json({
						message: `Anime already in the ${listType.toLowerCase()} list`,
					});
			}

			// Remove the anime from any other list related to the User
			const listTypes = ["watchedList", "watchingList", "toWatchList"];
			for (const type of listTypes) {
				if (type !== listType.toLowerCase()) {
					await prisma[type].deleteMany({ where: { animeId, userId } });
				}
			}

			// Add anime to the requested list
			const newListEntry = await prisma[listType.toLowerCase()].create({
				data: {
					title: animeTitle,
					animeId: animeId,
					userId: userId,
					rating: rating,
					listId: userList.id,
				},
			});

			res.status(200).json(newListEntry);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
