import type { User, UserStats } from "@/types/user";
import { uniqueOrganizations } from "@/lib/user-filters";

const CACHE_TTL_MS = 5 * 60_000;

let cache: { users: User[]; fetchedAt: number } | null = null;
let inflight: Promise<User[]> | null = null;

function getEndpoints(): string[] {
  const endpoints = (process.env.USERS_API_URL ?? "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  if (!endpoints.length) {
    throw new Error("USERS_API_URL is not set. Add it to .env.local (see .env.local.example).");
  }
  return endpoints;
}

async function fetchShard(url: string): Promise<User[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Users API request to ${url} failed with status ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  return Array.isArray(payload) ? (payload as User[]) : ((payload as { data?: User[] }).data ?? []);
}

function withStableUniqueIds(users: User[]): User[] {
  return users.map((user, index) => ({ ...user, id: String(index + 1) }));
}

async function fetchAllUsers(): Promise<User[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.users;
  }
  if (inflight) {
    return inflight;
  }

  inflight = (async () => {
    const shards = await Promise.all(getEndpoints().map(fetchShard));
    const users = withStableUniqueIds(shards.flat());

    if (!users.length) {
      throw new Error("Users API returned no records");
    }

    cache = { users, fetchedAt: Date.now() };
    return users;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  return fetchAllUsers();
}

export async function getUserById(id: string): Promise<User | undefined> {
  const users = await fetchAllUsers();
  return users.find((user) => user.id === id);
}

export async function getUserStats(): Promise<UserStats> {
  const users = await fetchAllUsers();
  return {
    total: users.length,
    active: users.filter((user) => user.status === "active").length,
    withLoans: users.filter((user) => user.hasLoans).length,
    withSavings: users.filter((user) => user.hasSavings).length,
  };
}

export async function getOrganizations(): Promise<string[]> {
  const users = await fetchAllUsers();
  return uniqueOrganizations(users);
}
