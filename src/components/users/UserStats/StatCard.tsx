import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { WaveLoader } from "@/components/ui/WaveLoader";
import { fadeInUp } from "@/lib/animations";
import type { StatTone } from "@/constants/stats";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: StatTone;
  label: string;
  value: number | null;
  countDelay?: number;
}

const cardVariants = fadeInUp(16);

export function StatCard({ icon: Icon, tone, label, value, countDelay }: StatCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={styles.card}
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${styles.iconWrap} ${styles[tone]}`}
      >
        <Icon className={styles.icon} />
      </motion.span>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {value === null ? <WaveLoader /> : <CountUp value={value} delay={countDelay} />}
      </span>
    </motion.div>
  );
}
