import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Assuming you have the user's ID, replace 'USER_ID_HERE' with the actual user's ID.
      const userId = 'USER_ID_HERE';

      // Retrieve user data by ID
      const userData = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Retrieve likes associated with the user
      const likeData = await prisma.like.findMany({
        where: {
          userId: userId,
        },
      });

      res.status(200).json({ userData: userData, likeData: likeData });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
