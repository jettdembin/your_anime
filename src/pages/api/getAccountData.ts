// api/getAccountData.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userId = '1'; // Normally obtained from an authentication mechanism

      // Retrieve user data by ID
      const userData = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          likes: true // Eager-load related 'Like' records
        }
      });

      if (!userData) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ userData });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}
