import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "./SearchBar";
import { ProfileMenu } from "./ProfileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { BellIcon, ChevronDownIcon, MenuIcon } from "@/components/icons";
import styles from "./Header.module.scss";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapsed: () => void;
}

export function Header({ onMenuClick, sidebarCollapsed, onToggleSidebarCollapsed }: HeaderProps) {
  const collapseLabel = sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <button
          type="button"
          onClick={onMenuClick}
          className={styles.menuButton}
          aria-label="Toggle navigation"
        >
          <MenuIcon className={styles.menuIcon} />
        </button>
        <Logo />
      </div>

      <motion.button
        type="button"
        onClick={onToggleSidebarCollapsed}
        title={collapseLabel}
        aria-label={collapseLabel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={styles.collapseButton}
      >
        <motion.span
          animate={{ rotate: sidebarCollapsed ? -90 : 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={styles.collapseIconWrap}
        >
          <ChevronDownIcon className={styles.collapseIcon} />
        </motion.span>
      </motion.button>

      <div className={styles.search}>
        <SearchBar />
      </div>

      <div className={styles.actions}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>
        <button type="button" className={styles.notifications} aria-label="Notifications">
          <BellIcon className={styles.bellIcon} />
          <span className={styles.badge} />
        </button>
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
}
