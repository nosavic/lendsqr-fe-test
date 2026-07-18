import type { UserStatus } from "@/types/user";

interface StatusConfig {
  label: string;
  className: string;
}

export const STATUS_CONFIG: Record<UserStatus, StatusConfig> = {
  active: { label: "Active", className: "bg-status-active/10 text-status-active" },
  inactive: { label: "Inactive", className: "bg-status-inactive/10 text-status-inactive" },
  pending: { label: "Pending", className: "bg-status-pending/10 text-status-pending" },
  blacklisted: { label: "Blacklisted", className: "bg-status-blacklisted/10 text-status-blacklisted" },
};

export const STATUS_OPTIONS: UserStatus[] = ["active", "inactive", "pending", "blacklisted"];
