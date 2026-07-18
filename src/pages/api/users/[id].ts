import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "@/lib/users-api";
import type { User } from "@/types/user";

interface ErrorResponse {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | ErrorResponse>) {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(404).json({ message: "User not found" });
    return;
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(502).json({ message: error instanceof Error ? error.message : "Failed to load user" });
  }
}
