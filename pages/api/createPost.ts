import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

type postProps = {
  title: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post: postProps = JSON.parse(req.body);
  if (req.method === "POST") {
    try {
      const data = await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          published: true,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error creating a new post" });
    }
  } else {
    res.status(403).json({ message: "Forbidden METHOD" });
  }
}
