import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SidebarNavItem } from "@/components/layout/SidebarNavItem";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { BriefcaseIcon, ChevronDownIcon, LogoutIcon } from "@/components/icons";
import {
  HEADER_HEIGHT_PX,
  NAV_GROUPS,
  SIDEBAR_COLLAPSED_WIDTH_PX,
  SIDEBAR_WIDTH_PX,
} from "@/constants/nav";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
}

const navContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const navGroupVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

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
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH_PX : SIDEBAR_WIDTH_PX }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        style={{ paddingTop: HEADER_HEIGHT_PX + 30 }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden bg-surface shadow-[5px_0_10px_rgba(0,0,0,0.025)] transition-colors transition-transform duration-200 md:z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button
          type="button"
          title={collapsed ? "Switch Organization" : undefined}
          className={`mx-4 mb-2 flex items-center gap-3 rounded-lg px-4 py-2 text-primary transition-colors hover:bg-surface-hover ${
            collapsed ? "w-fit justify-center px-2" : "w-fit"
          }`}
        >
          <BriefcaseIcon className="h-4 w-4 shrink-0" />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
              >
                <span className="text-sm">Switch Organization</span>
                <ChevronDownIcon className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navContainerVariants}
          className="flex flex-1 flex-col gap-8 overflow-y-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_GROUPS.map((group, index) => (
            <motion.div key={group.title ?? `group-${index}`} variants={navGroupVariants}>
              {group.title && !collapsed && (
                <p className="mb-2 ml-6 text-xs font-medium text-body">{group.title}</p>
              )}
              <div className="flex flex-col">
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

        <div className="border-t border-card-line py-4">
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center gap-3 border-l-[3px] border-transparent py-[0.6rem] text-[0.9rem] text-primary transition-colors hover:bg-surface-active ${
              collapsed ? "justify-center px-2" : "pl-6"
            }`}
          >
            <LogoutIcon className="h-4 w-4 shrink-0" />
            {!collapsed && "Logout"}
          </button>
          {!collapsed && <p className="ml-6 mt-2 text-xs text-body">v1.2.0</p>}
        </div>
      </motion.aside>

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
