import type { User, UserStatus } from "@/types/user";

export interface UserFilters {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: UserStatus | "";
}

export const EMPTY_USER_FILTERS: UserFilters = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

export const FILTER_LABELS: Record<keyof UserFilters, string> = {
  organization: "Organization",
  username: "Username",
  email: "Email",
  date: "Date joined",
  phoneNumber: "Phone number",
  status: "Status",
};

export type FilterField = keyof UserFilters;

export interface ActiveFilter {
  field: FilterField;
  label: string;
  value: string;
}

export function activeFilters(filters: UserFilters): ActiveFilter[] {
  return (Object.keys(FILTER_LABELS) as FilterField[])
    .filter((field) => filters[field] !== "")
    .map((field) => ({ field, label: FILTER_LABELS[field], value: filters[field] }));
}

export function countActiveFilters(filters: UserFilters): number {
  return activeFilters(filters).length;
}

export function clearFilterField(filters: UserFilters, field: FilterField): UserFilters {
  return { ...filters, [field]: "" };
}

export function filterUsers(users: User[], filters: UserFilters): User[] {
  return users.filter((user) => {
    if (filters.organization && user.organization !== filters.organization) return false;
    if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) return false;
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.date && !user.dateJoined.startsWith(filters.date)) return false;
    return true;
  });
}

export function uniqueOrganizations(users: User[]): string[] {
  return Array.from(new Set(users.map((user) => user.organization))).sort();
}

export function filtersToSearchParams(filters: UserFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.organization) params.set("organization", filters.organization);
  if (filters.username) params.set("username", filters.username);
  if (filters.email) params.set("email", filters.email);
  if (filters.phoneNumber) params.set("phoneNumber", filters.phoneNumber);
  if (filters.status) params.set("status", filters.status);
  if (filters.date) params.set("date", filters.date);

  return params;
}
