import type { User } from "@/types/user";

const STORAGE_PREFIX = "lendsqr.user.";

export function readCachedUser(id: string): User | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function writeCachedUser(user: User): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${user.id}`, JSON.stringify(user));
  } catch {
    return;
  }
}
