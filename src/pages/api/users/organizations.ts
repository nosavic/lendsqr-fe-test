import type { NextApiRequest, NextApiResponse } from "next";
import { getOrganizations } from "@/lib/users-api";

interface OrganizationsResponse {
  organizations: string[];
}

interface ErrorResponse {
  message: string;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<OrganizationsResponse | ErrorResponse>,
) {
  try {
    res.status(200).json({ organizations: await getOrganizations() });
  } catch (error) {
    res.status(502).json({ message: error instanceof Error ? error.message : "Failed to load organizations" });
  }
}
