import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { STAT_CARDS } from "@/constants/stats";
import { staggerContainer } from "@/lib/animations";
import styles from "./UserStats.module.scss";
import type { UserStats as UserStatsData } from "@/types/user";

interface UserStatsProps {
  stats: UserStatsData | null;
}

const gridVariants = staggerContainer(0.06);

export function UserStats({ stats }: UserStatsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={gridVariants}
      className={styles.grid}
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
