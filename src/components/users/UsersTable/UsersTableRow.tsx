import { motion } from "framer-motion";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { UserActionsMenu } from "@/components/users/UserActionsMenu";
import { formatDate } from "@/lib/format";
import type { User } from "@/types/user";
import styles from "./UsersTableRow.module.scss";

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
      className={styles.row}
    >
      <td className={`${styles.cell} ${styles.organization}`}>{user.organization}</td>
      <td className={styles.cell}>{user.username}</td>
      <td className={`${styles.cell} ${styles.email}`}>{user.email}</td>
      <td className={`${styles.cell} ${styles.nowrap}`}>{user.phoneNumber}</td>
      <td className={`${styles.cell} ${styles.nowrap}`}>{formatDate(user.dateJoined)}</td>
      <td className={styles.cell}>
        <StatusBadge status={user.status} />
      </td>
      <td className={`${styles.cell} ${styles.actions}`} onClick={(event) => event.stopPropagation()}>
        <UserActionsMenu onView={() => onSelect(user)} />
      </td>
    </motion.tr>
  );
}
