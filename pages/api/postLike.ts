import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { animeId, animeTitle, userId, rating } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      // Check if a like already exists for the given animeId and userId
      const existingLike = await prisma.like.findFirst({
        where: {
          AND: [{ animeId: animeId }, { userId: userId }],
        },
      });

      if (!existingLike) {
        // If a like doesn't exist, create one
        const newLike = await prisma.like.create({
          data: {
            title: animeTitle,
            animeId: animeId,
            userId: userId,
            rating,
          },
        });

        res.status(200).json(newLike);
      } else {
        // If the like already exists, send a conflict response
        res.status(409).json({ message: "Already in your likes" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  } else {
    // If the HTTP method is not POST, send a method not allowed response
    res.status(405).json({ message: "Method not allowed" });
  }
}
