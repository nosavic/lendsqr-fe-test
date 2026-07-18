import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBg: string;
  label: string;
  value: string;
}

const cardVariants = fadeInUp(16);

export function StatCard({ icon: Icon, iconBg, label, value }: StatCardProps) {
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
        className={`${styles.iconWrap} ${iconBg}`}
      >
        <Icon className={styles.icon} />
      </motion.span>
      <span className={styles.label}>{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={styles.value}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
