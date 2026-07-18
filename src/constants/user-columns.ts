import type { FilterField } from "@/lib/user-filters";

export interface UserColumn {
  label: string;
  field: FilterField;
}

export const USER_COLUMNS: UserColumn[] = [
  { label: "Organization", field: "organization" },
  { label: "Username", field: "username" },
  { label: "Email", field: "email" },
  { label: "Phone Number", field: "phoneNumber" },
  { label: "Date Joined", field: "date" },
  { label: "Status", field: "status" },
];
