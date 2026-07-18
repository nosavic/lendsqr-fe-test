import type { Transition, Variants } from "framer-motion";

export type TransitionKind = "drill-forward" | "drill-back" | "fade";

const USERS_LIST_ROUTE = "/users";
const USER_DETAIL_ROUTE = "/users/[id]";

export function resolveTransitionKind(fromPath: string, toPath: string): TransitionKind {
  if (fromPath === USERS_LIST_ROUTE && toPath === USER_DETAIL_ROUTE) return "drill-forward";
  if (fromPath === USER_DETAIL_ROUTE && toPath === USERS_LIST_ROUTE) return "drill-back";
  return "fade";
}

export const pageVariants: Variants = {
  initial: (kind: TransitionKind) => {
    if (kind === "drill-forward") return { opacity: 0, x: 48, scale: 0.98 };
    if (kind === "drill-back") return { opacity: 0, x: -48, scale: 0.98 };
    return { opacity: 0, y: 8 };
  },
  animate: { opacity: 1, x: 0, y: 0, scale: 1 },
  exit: (kind: TransitionKind) => {
    if (kind === "drill-forward") return { opacity: 0, x: -32, scale: 0.97 };
    if (kind === "drill-back") return { opacity: 0, x: 32, scale: 0.97 };
    return { opacity: 0, y: -8 };
  },
};

export function pageTiming(kind: TransitionKind): Transition {
  return kind === "fade"
    ? { duration: 0.2, ease: "easeOut" }
    : { duration: 0.32, ease: [0.16, 1, 0.3, 1] };
}

export const shellTransition: Transition = { duration: 0.25, ease: "easeOut" };
