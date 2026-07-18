import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "lendsqr-theme";
const DARK_CLASS = "dark";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = (event: MediaQueryListEvent) => {
    if (window.localStorage.getItem(STORAGE_KEY)) return;
    applyTheme(event.matches ? "dark" : "light");
  };

  media.addEventListener("change", handleSystemChange);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", handleSystemChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains(DARK_CLASS) ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
  notify();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
