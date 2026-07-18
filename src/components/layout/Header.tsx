import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BellIcon, ChevronDownIcon, MenuIcon } from "@/components/icons";
import { HEADER_HEIGHT_PX } from "@/constants/nav";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapsed: () => void;
}

export function Header({ onMenuClick, sidebarCollapsed, onToggleSidebarCollapsed }: HeaderProps) {
  return (
    <header
      style={{ height: HEADER_HEIGHT_PX }}
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-4 bg-surface pl-[30px] pr-4 shadow-[0_0.5px_10px_rgba(0,0,0,0.051)] transition-colors sm:pr-12"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-2 text-primary hover:bg-surface-hover md:hidden"
          aria-label="Toggle navigation"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <Logo />
      </div>

      <motion.button
        type="button"
        onClick={onToggleSidebarCollapsed}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ left: "max(var(--sidebar-width), 140px)" }}
        className="absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-md p-2 text-primary transition-[left] duration-200 hover:bg-surface-hover md:flex"
      >
        <motion.span
          animate={{ rotate: sidebarCollapsed ? -90 : 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex"
        >
          <ChevronDownIcon className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <div className="hidden flex-1 justify-center px-4 sm:flex md:justify-start md:pl-40">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <a href="#" className="hidden text-sm text-primary underline hover:text-primary-dark sm:inline">
          Docs
        </a>
        <button type="button" className="relative text-primary" aria-label="Notifications">
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-surface bg-[#ff3333]" />
        </button>
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
}
