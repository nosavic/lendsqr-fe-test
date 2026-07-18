import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarNavItem } from "./SidebarNavItem";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { fadeInLeft, staggerContainer } from "@/lib/animations";
import { BriefcaseIcon, ChevronDownIcon, LogoutIcon } from "@/components/icons";
import { NAV_GROUPS } from "@/constants/nav";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
}

const navContainerVariants = staggerContainer(0.035);
const navGroupVariants = fadeInLeft(8);

export function Sidebar({ isOpen, onClose, collapsed }: SidebarProps) {
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "#") return false;
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  }

  function handleConfirmLogout() {
    setLogoutModalOpen(false);
    router.push("/login");
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={styles.overlay}
          />
        )}
      </AnimatePresence>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button
          type="button"
          title={collapsed ? "Switch Organization" : undefined}
          className={`${styles.orgSwitcher} ${collapsed ? styles.collapsed : ""}`}
        >
          <BriefcaseIcon className={styles.orgIcon} />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className={styles.orgLabel}
              >
                <span className={styles.orgText}>Switch Organization</span>
                <ChevronDownIcon className={styles.orgCaret} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navContainerVariants}
          className={styles.nav}
        >
          {NAV_GROUPS.map((group, index) => (
            <motion.div key={group.title ?? `group-${index}`} variants={navGroupVariants}>
              {group.title && !collapsed && <p className={styles.groupTitle}>{group.title}</p>}
              <div className={styles.groupItems}>
                {group.items.map((item) => (
                  <SidebarNavItem
                    key={item.label}
                    item={item}
                    active={isActive(item.href)}
                    onNavigate={onClose}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.nav>

        <div className={styles.footer}>
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            title={collapsed ? "Logout" : undefined}
            className={`${styles.logout} ${collapsed ? styles.logoutCollapsed : ""}`}
          >
            <LogoutIcon className={styles.logoutIcon} />
            {!collapsed && "Logout"}
          </button>
          {!collapsed && <p className={styles.version}>v1.2.0</p>}
        </div>
      </aside>

      <ConfirmModal
        open={logoutModalOpen}
        title="Log out"
        description="Are you sure you want to log out of your account?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </>
  );
}
