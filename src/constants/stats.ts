import type { ComponentType, SVGProps } from "react";
import {
  StatActiveUsersIcon,
  StatUsersIcon,
  StatUsersWithLoansIcon,
  StatUsersWithSavingsIcon,
} from "@/components/icons";
import type { UserStats } from "@/types/user";

export type StatTone = "users" | "active" | "loans" | "savings";

export interface StatCardConfig {
  key: keyof UserStats;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: StatTone;
}

export const STAT_CARDS: StatCardConfig[] = [
  { key: "total", label: "USERS", icon: StatUsersIcon, tone: "users" },
  { key: "active", label: "ACTIVE USERS", icon: StatActiveUsersIcon, tone: "active" },
  { key: "withLoans", label: "USERS WITH LOANS", icon: StatUsersWithLoansIcon, tone: "loans" },
  { key: "withSavings", label: "USERS WITH SAVINGS", icon: StatUsersWithSavingsIcon, tone: "savings" },
];
