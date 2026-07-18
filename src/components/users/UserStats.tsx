import { motion } from "framer-motion";
import { StatCard } from "@/components/users/StatCard";
import { STAT_CARDS } from "@/constants/stats";
import type { UserStats as UserStatsData } from "@/types/user";

interface UserStatsProps {
  stats: UserStatsData | null;
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function UserStats({ stats }: UserStatsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={gridVariants}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      {STAT_CARDS.map((card) => (
        <StatCard
          key={card.key}
          icon={card.icon}
          iconBg={card.iconBg}
          label={card.label}
          value={stats ? stats[card.key].toLocaleString() : "—"}
        />
      ))}
    </motion.div>
  );
}
