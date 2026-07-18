import { motion } from "framer-motion";
import styles from "./Tabs.module.scss";

interface TabsProps {
  tabs: readonly string[];
  active: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
          >
            {tab}
            {isActive && (
              <motion.span
                layoutId="tabs-underline"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className={styles.indicator}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
