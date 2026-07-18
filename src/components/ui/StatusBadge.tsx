import type { UserStatus } from "@/types/user";
import { STATUS_CONFIG } from "@/constants/status";

interface StatusBadgeProps {
  status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span className={`inline-flex items-center rounded-2xl px-2.5 py-1 text-[11px] font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
