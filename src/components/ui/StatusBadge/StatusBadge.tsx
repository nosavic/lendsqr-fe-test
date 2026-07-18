import type { UserStatus } from "@/types/user";
import { STATUS_CONFIG } from "@/constants/status";
import styles from "./StatusBadge.module.scss";

interface StatusBadgeProps {
  status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>{STATUS_CONFIG[status].label}</span>
  );
}
