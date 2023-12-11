import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

type PostToListRequestBody = {
  animeId: string;
  animeTitle: string;
  userId: string;
  rating: number;
  listType: "WATCHED" | "WATCHING" | "TO_WATCH";
};

type ListCheck = {
  watchedList?: Array<{ animeId: string }>;
  watchingList?: Array<{ animeId: string }>;
  toWatchList?: Array<{ animeId: string }>;
};

// Define a type for the create functions of each list
type CreateFunction = (args: {
  data: {
    title: string;
    animeId: string;
    userId: string;
    rating: number;
    listId: string;
  };
}) => Promise<any>; // Use the correct return type here

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
      const listCheck: ListCheck | null = await prisma.list.findUnique({
        where: { userId: userId },
        include: {
          watchedList: listType === "WATCHED",
          watchingList: listType === "WATCHING",
          toWatchList: listType === "TO_WATCH",
        },
      });

      if (!listCheck) {
        return res.status(404).json({ message: "List not found" });
      }

      const listName = `${listType.toLowerCase()}List` as keyof ListCheck;
      const isInRequestedList = listCheck[listName]?.some(
        (item) => item.animeId === animeId
      );

      if (isInRequestedList) {
        return res.status(409).json({
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
      const listModel: any = {
        WATCHED: prisma.watchedList.create,
        WATCHING: prisma.watchingList.create,
        TO_WATCH: prisma.toWatchList.create,
      } as any;

      const newListEntry = await listModel[listType]({
        data: {
          title: animeTitle,
          animeId: animeId,
          userId: userId,
          rating: rating,
          listId: userList.id,
        },
      });

      res.status(200).json(newListEntry);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
