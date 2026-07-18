import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { HEADER_HEIGHT_PX, SIDEBAR_COLLAPSED_WIDTH_PX, SIDEBAR_WIDTH_PX } from "@/constants/nav";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const layoutVars = {
    "--sidebar-width": `${sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH_PX : SIDEBAR_WIDTH_PX}px`,
    "--header-height": `${HEADER_HEIGHT_PX}px`,
  } as CSSProperties;

  return (
    <div style={layoutVars} className={styles.shell}>
      <Header
        onMenuClick={() => setSidebarOpen((open) => !open)}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebarCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} />

      <main className={styles.main}>{children}</main>
    </div>
  );
}
