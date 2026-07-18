import { motion } from "framer-motion";
import { USER_DETAIL_TABS } from "@/constants/user-detail-tabs";
import { formatCurrency } from "@/lib/format";
import { Avatar, Stars, Tabs } from "@/components/ui";
import type { UserDetailTab } from "@/constants/user-detail-tabs";
import type { User } from "@/types/user";
import styles from "./UserSummaryCard.module.scss";

interface UserSummaryCardProps {
  user: User;
  activeTab: UserDetailTab;
  onTabChange: (tab: UserDetailTab) => void;
}

export function UserSummaryCard({ user, activeTab, onTabChange }: UserSummaryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.summary}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.identity}
        >
          <Avatar name={user.fullName} size="lg" placeholder />
          <div className={styles.names}>
            <p className={styles.fullName}>{user.fullName}</p>
            <p className={styles.username}>{user.username}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
          className={`${styles.tier} ${styles.divided}`}
        >
          <p className={styles.tierLabel}>User&apos;s Tier</p>
          <Stars value={user.tier} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14, ease: "easeOut" }}
          className={styles.balance}
        >
          <p className={styles.amount}>{formatCurrency(user.accountBalance)}</p>
          <p className={styles.account}>
            {user.accountNumber}/{user.bankName}
          </p>
        </motion.div>
      </div>

      <div className={styles.tabs}>
        <Tabs tabs={USER_DETAIL_TABS} active={activeTab} onChange={(tab) => onTabChange(tab as UserDetailTab)} />
      </div>
    </div>
  );
}
