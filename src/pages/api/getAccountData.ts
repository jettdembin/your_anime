import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

//get user account data
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const data = await prisma.user.findMany();
			const likes = await prisma.like.findMany();
			res.status(200).json({...likes, ...data});
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
