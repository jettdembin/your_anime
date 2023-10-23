import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Assuming you receive the GraphQL ID of the anime in the request body.
      const { animeId, animeTitle } = req.body;

      // Check if the user is authenticated and get the user's ID.
      const userId = "1"; // Replace with actual user authentication.

      // Create a new like using Prisma.
      const newLike = await prisma.like.create({
        data: {
          title: animeTitle, // Set the appropriate title.
          postId: animeId, // Assuming postId represents the anime ID.
          likeId: userId, // Assuming likeId represents the user who liked.
        },
      });

      // Update the User record to include the new like.
      await prisma.user.update({
        where: { id: userId },
        data: {
          likes: {
            connect: { id: newLike.id }, // Connect the new like to the user's likes array.
          },
        },
      });

      /// Respond with the newly created like.
      res.status(201).json(newLike);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
