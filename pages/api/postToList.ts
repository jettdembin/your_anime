import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

// Define a type for the request body
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

		// Validate required fields
		if (!userId) {
			return res
				.status(400)
				.json({ message: `Missing required ${userId} field` });
		}
		if (!listType) {
			return res
				.status(400)
				.json({ message: `Missing required ${listType} field` });
		}
		if (!animeId) {
			return res
				.status(400)
				.json({ message: `Missing required ${animeId} field` });
		}

		try {
			// Retrieve or create the user's list
			let userList = await prisma.list.findFirst({
				where: { userId: userId },
			});

			if (!userList) {
				// If the user's list doesn't exist, create it
				userList = await prisma.list.create({
					data: {
						userId: userId,
					},
				});
			}

			// Function to remove anime from a list
			const removeFromList = async (
				listType: "WATCHED" | "WATCHING" | "TO_WATCH",
				animeId: string
			) => {
				switch (listType) {
					case "WATCHED":
						await prisma.watchedList.deleteMany({ where: { animeId, userId } });
						break;
					case "WATCHING":
						await prisma.watchingList.deleteMany({
							where: { animeId, userId },
						});
						break;
					case "TO_WATCH":
						await prisma.toWatchList.deleteMany({ where: { animeId, userId } });
						break;
				}
			};

			// Check if the anime is already in any list and remove it
			const listCheck = await prisma.list.findUnique({
				where: { userId: userId },
				include: {
					watchedList: true,
					watchingList: true,
					toWatchList: true,
				},
			});

			const isInList = (list: any[]) =>
				list.some((item) => item.animeId === animeId);
			if (isInList(listCheck?.watchedList || []))
				await removeFromList("WATCHED", animeId);
			if (isInList(listCheck?.watchingList || []))
				await removeFromList("WATCHING", animeId);
			if (isInList(listCheck?.toWatchList || []))
				await removeFromList("TO_WATCH", animeId);

			// Function to check if anime is in the specific list
			const isInSpecificList = async (
				listType: "WATCHED" | "WATCHING" | "TO_WATCH",
				animeId: string
			) => {
				const listCheck = await prisma.list.findUnique({
					where: { userId: userId },
					include: {
						watchedList: listType === "WATCHED",
						watchingList: listType === "WATCHING",
						toWatchList: listType === "TO_WATCH",
					},
				});

				const list =
					listType === "WATCHED"
						? listCheck?.watchedList
						: listType === "WATCHING"
						? listCheck?.watchingList
						: listCheck?.toWatchList;

				return list?.some((item) => item.animeId === animeId);
			};

			if (await isInSpecificList(listType, animeId)) {
				return res
					.status(409)
					.json({ message: "Anime already in the specified list" });
			}

			// Add anime to the specified list and link it to the user's list
			let newListEntry;
			switch (listType) {
				case "WATCHED":
					newListEntry = await prisma.watchedList.create({
						data: {
							title: animeTitle,
							animeId: animeId,
							userId: userId,
							rating: rating,
							list: {
								connect: { id: userList.id },
							},
						},
					});
					break;
				case "WATCHING":
					newListEntry = await prisma.watchingList.create({
						data: {
							title: animeTitle,
							animeId: animeId,
							userId: userId,
							rating: rating,
							list: {
								connect: { id: userList.id },
							},
						},
					});
					break;
				case "TO_WATCH":
					newListEntry = await prisma.toWatchList.create({
						data: {
							title: animeTitle,
							animeId: animeId,
							userId: userId,
							rating: rating,
							list: {
								connect: { id: userList.id },
							},
						},
					});
					break;
				default:
					return res.status(400).json({ message: "Invalid list type" });
			}

			res.status(200).json(newListEntry);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
