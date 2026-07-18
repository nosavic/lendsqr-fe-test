import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "lendsqr-sidebar-collapsed";
const COLLAPSED_CLASS = "sidebar-collapsed";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains(COLLAPSED_CLASS);
}

function getServerSnapshot(): boolean {
  return false;
}

function apply(collapsed: boolean) {
  document.documentElement.classList.toggle(COLLAPSED_CLASS, collapsed);
  listeners.forEach((listener) => listener());
}

export function useSidebarCollapsed() {
  const collapsed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleCollapsed = useCallback(() => {
    const next = !getSnapshot();
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "collapsed" : "expanded");
    } catch {
      // a full or unavailable store should not stop the sidebar from moving
    }
    apply(next);
  }, []);

  return { collapsed, toggleCollapsed };
}
