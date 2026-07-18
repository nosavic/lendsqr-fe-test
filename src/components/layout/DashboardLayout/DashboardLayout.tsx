import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { HEADER_HEIGHT_PX, SIDEBAR_COLLAPSED_WIDTH_PX, SIDEBAR_WIDTH_PX } from "@/constants/nav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      style={
        {
          "--sidebar-width": `${sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH_PX : SIDEBAR_WIDTH_PX}px`,
          "--header-height": `${HEADER_HEIGHT_PX}px`,
        } as CSSProperties
      }
      className="min-h-screen bg-app"
    >
      <Header
        onMenuClick={() => setSidebarOpen((open) => !open)}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebarCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} />

      <main className="min-h-screen overflow-x-hidden pt-[var(--header-height)] transition-[padding] duration-200 md:pl-[var(--sidebar-width)]">
        {children}
      </main>
    </div>
  );
}
