import type { User } from "@/types/user";

const STORAGE_PREFIX = "lendsqr.user.v2.";
const LEGACY_PREFIXES = ["lendsqr.user."];

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<User>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.fullName === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.status === "string" &&
    typeof candidate.educationAndEmployment === "object" &&
    candidate.educationAndEmployment !== null &&
    typeof candidate.socials === "object" &&
    candidate.socials !== null &&
    Array.isArray(candidate.guarantors)
  );
}

export function readCachedUser(id: string): User | null {
  if (typeof window === "undefined") return null;

  const key = `${STORAGE_PREFIX}${id}`;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isUser(parsed)) {
      window.localStorage.removeItem(key);
      return null;
    }

    return parsed;
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

export function clearLegacyCachedUsers(): void {
  if (typeof window === "undefined") return;

  try {
    const stale = Object.keys(window.localStorage).filter(
      (key) => LEGACY_PREFIXES.some((prefix) => key.startsWith(prefix)) && !key.startsWith(STORAGE_PREFIX),
    );
    stale.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    return;
  }
}
