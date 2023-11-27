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
			// Retrieve the user's list or create it if not present
			let userList = await prisma.list.findFirst({ where: { userId: userId } });
			if (!userList) {
				userList = await prisma.list.create({ data: { userId: userId } });
			}

			// Check if the anime is already in the requested list
			const listCheck = await prisma.list.findUnique({
				where: { userId: userId },
				include: {
					watchedList: listType === "WATCHED",
					watchingList: listType === "WATCHING",
					toWatchList: listType === "TO_WATCH",
				},
			});

			const listName = listType.toLowerCase() + "List";
			const isInRequestedList = listCheck[listName].some(
				(item) => item.animeId === animeId
			);

			if (isInRequestedList) {
				return res
					.status(409)
					.json({
						message: `Anime already in the ${listType.toLowerCase()} list`,
					});
			}

			// Remove the anime from any other list
			await prisma.watchedList.deleteMany({
				where: { animeId, userId, NOT: { listId: userList.id } },
			});
			await prisma.watchingList.deleteMany({
				where: { animeId, userId, NOT: { listId: userList.id } },
			});
			await prisma.toWatchList.deleteMany({
				where: { animeId, userId, NOT: { listId: userList.id } },
			});

			// Add anime to the requested list
			const listModel = {
				WATCHED: prisma.watchedList,
				WATCHING: prisma.watchingList,
				TO_WATCH: prisma.toWatchList,
			}[listType];

			const newListEntry = await listModel.create({
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
