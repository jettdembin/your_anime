import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Check if the request contains data for creating a like.
      if (req.body && req.body.userId && req.body.postId) {
        // Assuming you have userId and postId in the request body.
        const { userId, postId } = req.body;

        // Create a new like using Prisma.
        const newLike = await prisma.like.create({
          data: {
            title: "Your Like Title", // Set the appropriate title.
            postId,
            likeId: userId, // Assuming likeId represents the user who liked.
          },
        });

        // Respond with the newly created like.
        res.status(201).json(newLike);
      } else {
        // Handle invalid or missing data in the request body.
        res.status(400).json({ message: "Invalid request data." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods if needed.
    res.status(405).json({ message: "Method not allowed" });
  }
}
