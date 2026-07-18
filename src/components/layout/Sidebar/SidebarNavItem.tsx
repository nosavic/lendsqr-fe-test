import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { NavItem } from "@/constants/nav";

interface SidebarNavItemProps {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
  collapsed?: boolean;
}

export function SidebarNavItem({ item, active, onNavigate, collapsed }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={`group relative flex items-center gap-3 overflow-hidden border-l-[3px] py-[0.6rem] text-[0.9rem] transition-colors ${
        collapsed ? "justify-center px-2" : "pl-6"
      } ${
        active
          ? "border-secondary bg-surface-active text-primary"
          : "border-transparent text-nav-inactive hover:border-secondary hover:bg-surface-active hover:text-primary"
      }`}
    >
      <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} className="flex shrink-0">
        <Icon className={`h-4 w-4 shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`} />
      </motion.span>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
