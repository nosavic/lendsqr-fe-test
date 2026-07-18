import { useState } from "react";
import type { ReactNode } from "react";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { collapsed, toggleCollapsed } = useSidebarCollapsed();

  return (
    <div className={styles.shell}>
      <Header
        onMenuClick={() => setSidebarOpen((open) => !open)}
        sidebarCollapsed={collapsed}
        onToggleSidebarCollapsed={toggleCollapsed}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={collapsed} />

      <main className={styles.main}>{children}</main>
    </div>
  );
}
