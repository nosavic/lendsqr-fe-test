import { motion } from "framer-motion";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { UserActionsMenu } from "@/components/users/UserActionsMenu";
import { formatDate } from "@/lib/format";
import type { User } from "@/types/user";

const MAX_STAGGERED_ROWS = 8;

interface UsersTableRowProps {
  user: User;
  index: number;
  onSelect: (user: User) => void;
}

export function UsersTableRow({ user, index, onSelect }: UsersTableRowProps) {
  return (
    <motion.tr
      onClick={() => onSelect(user)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.2, delay: Math.min(index, MAX_STAGGERED_ROWS) * 0.03 }}
      className="cursor-pointer border-t border-border-subtle transition-colors hover:bg-surface-hover"
    >
      <td className="max-w-[160px] truncate px-2 py-4">{user.organization}</td>
      <td className="px-2 py-4">{user.username}</td>
      <td className="max-w-[200px] truncate px-2 py-4">{user.email}</td>
      <td className="whitespace-nowrap px-2 py-4">{user.phoneNumber}</td>
      <td className="whitespace-nowrap px-2 py-4">{formatDate(user.dateJoined)}</td>
      <td className="px-2 py-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-2 py-4 text-right" onClick={(event) => event.stopPropagation()}>
        <UserActionsMenu onView={() => onSelect(user)} />
      </td>
    </motion.tr>
  );
}
