import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({});
      console.log(data)
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "Forbidden METHOD" });
  }
}
