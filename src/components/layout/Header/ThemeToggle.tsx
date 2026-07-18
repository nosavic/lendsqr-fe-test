import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/hooks/useTheme";
import styles from "./ThemeToggle.module.scss";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={label}
      aria-label={label}
      className={styles.toggle}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={styles.iconWrap}
      >
        {isDark ? <MoonIcon className={styles.icon} /> : <SunIcon className={styles.icon} />}
      </motion.span>
    </motion.button>
  );
}
