import type { ComponentType, SVGProps } from "react";
import {
  StatActiveUsersIcon,
  StatUsersIcon,
  StatUsersWithLoansIcon,
  StatUsersWithSavingsIcon,
} from "@/components/icons";
import type { UserStats } from "@/types/user";

export interface StatCardConfig {
  key: keyof UserStats;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBg: string;
}

export const STAT_CARDS: StatCardConfig[] = [
  { key: "total", label: "USERS", icon: StatUsersIcon, iconBg: "bg-[#fce8ff]" },
  { key: "active", label: "ACTIVE USERS", icon: StatActiveUsersIcon, iconBg: "bg-[#eee8ff]" },
  { key: "withLoans", label: "USERS WITH LOANS", icon: StatUsersWithLoansIcon, iconBg: "bg-[#feeeeb]" },
  { key: "withSavings", label: "USERS WITH SAVINGS", icon: StatUsersWithSavingsIcon, iconBg: "bg-[#ffebf0]" },
];
