import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { NavItem } from "@/constants/nav";
import styles from "./SidebarNavItem.module.scss";

interface SidebarNavItemProps {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
  collapsed?: boolean;
}

export function SidebarNavItem({ item, active, onNavigate, collapsed }: SidebarNavItemProps) {
  const Icon = item.icon;
  const classes = [styles.item, collapsed ? styles.collapsed : "", active ? styles.active : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      aria-current={active ? "page" : undefined}
      className={classes}
    >
      <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} className={styles.iconWrap}>
        <Icon className={`${styles.icon} ${active ? styles.iconActive : ""}`} />
      </motion.span>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className={styles.label}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
