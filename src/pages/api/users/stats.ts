import type { NextApiRequest, NextApiResponse } from "next";
import { getUserStats } from "@/lib/users-api";
import type { UserStats } from "@/types/user";

interface ErrorResponse {
  message: string;
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<UserStats | ErrorResponse>) {
  try {
    res.status(200).json(await getUserStats());
  } catch (error) {
    res.status(502).json({ message: error instanceof Error ? error.message : "Failed to load stats" });
  }
}
