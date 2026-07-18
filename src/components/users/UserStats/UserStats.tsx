import { motion } from "framer-motion";
import { STAT_CARDS } from "@/constants/stats";
import { staggerContainer } from "@/lib/animations";
import type { UserStats as UserStatsData } from "@/types/user";
import { StatCard } from "./StatCard";
import styles from "./UserStats.module.scss";

interface UserStatsProps {
  stats: UserStatsData | null;
}

const CARD_STAGGER_SECONDS = 0.06;
const gridVariants = staggerContainer(CARD_STAGGER_SECONDS);

export function UserStats({ stats }: UserStatsProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={gridVariants} className={styles.grid}>
      {STAT_CARDS.map((card, index) => (
        <StatCard
          key={card.key}
          icon={card.icon}
          tone={card.tone}
          label={card.label}
          value={stats ? stats[card.key] : null}
          countDelay={index * CARD_STAGGER_SECONDS}
        />
      ))}
    </motion.div>
  );
}
