import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
      className="flex flex-col gap-3 rounded-[5px] border border-card-line bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-colors"
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex h-10 w-10 items-center justify-center rounded-full dark:brightness-[0.35] dark:contrast-125 ${iconBg}`}
      >
        <Icon className="h-5 w-5" />
      </motion.span>
      <span className="text-[0.9rem] font-medium tracking-[-0.5px] text-body">{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-[1.7rem] font-semibold tracking-[-0.5px] text-primary"
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
