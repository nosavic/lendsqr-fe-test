import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from "@/lib/users-api";
import { filterUsers } from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";
import type { User } from "@/types/user";

interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}

interface ErrorResponse {
  message: string;
}

const DEFAULT_PAGE_SIZE = 5;
const MAX_PAGE_SIZE = 100;

function toQueryString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersResponse | ErrorResponse>,
) {
  const filters: UserFilters = {
    organization: toQueryString(req.query.organization),
    username: toQueryString(req.query.username),
    email: toQueryString(req.query.email),
    phoneNumber: toQueryString(req.query.phoneNumber),
    status: toQueryString(req.query.status) as UserFilters["status"],
    date: toQueryString(req.query.date),
  };

  const page = toPositiveInt(req.query.page, 1);
  const pageSize = Math.min(toPositiveInt(req.query.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);

  try {
    const users = await getAllUsers();
    const filtered = filterUsers(users, filters);
    const start = (page - 1) * pageSize;

    res.status(200).json({
      data: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    });
  } catch (error) {
    res.status(502).json({ message: error instanceof Error ? error.message : "Failed to load users" });
  }
}
