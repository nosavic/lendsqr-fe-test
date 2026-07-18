import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Stars } from "@/components/ui/Stars";
import { Tabs } from "@/components/ui/Tabs";
import { USER_DETAIL_TABS } from "@/constants/user-detail-tabs";
import type { UserDetailTab } from "@/constants/user-detail-tabs";
import { formatCurrency } from "@/lib/format";
import type { User } from "@/types/user";

interface UserSummaryCardProps {
  user: User;
  activeTab: UserDetailTab;
  onTabChange: (tab: UserDetailTab) => void;
}

export function UserSummaryCard({ user, activeTab, onTabChange }: UserSummaryCardProps) {
  return (
    <div className="rounded-lg bg-surface pt-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-6 px-6 pb-6 md:flex-row md:items-center md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5 md:pr-8"
        >
          <Avatar name={user.fullName} size="lg" />
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-medium text-primary">{user.fullName}</p>
            <p className="text-body">{user.username}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
          className="flex flex-col gap-2 md:border-l md:border-body/20 md:px-8"
        >
          <p className="text-sm text-body">User&apos;s Tier</p>
          <Stars value={user.tier} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14, ease: "easeOut" }}
          className="flex flex-col gap-1 md:border-l md:border-body/20 md:pl-8"
        >
          <p className="text-2xl font-medium text-primary">{formatCurrency(user.accountBalance)}</p>
          <p className="text-sm font-medium text-primary">
            {user.accountNumber}/{user.bankName}
          </p>
        </motion.div>
      </div>

      <div className="px-2 md:px-6">
        <Tabs tabs={USER_DETAIL_TABS} active={activeTab} onChange={(tab) => onTabChange(tab as UserDetailTab)} />
      </div>
    </div>
  );
}
