import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { animeId, animeTitle } = req.body;
      const userId = "1"; // Replace with actual user authentication.

      // Check if a like already exists for the given animeId and userId
      const existingLike = await prisma.like.findFirst({
        where: {
          AND: [
            { postId: animeId },
            { likeId: userId },
          ],
        },
      });

      // If a like doesn't exist, create one
      if (!existingLike) {
        const newLike = await prisma.like.create({
          data: {
            title: animeTitle,
            postId: animeId,
            likeId: userId,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: {
            likes: {
              connect: { id: newLike.id },
            },
          },
        });

        res.status(200).json(newLike);
      } else {
        res.status(409).json({ message: "Like already exists" });
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
