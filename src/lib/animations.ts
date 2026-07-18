import type { Variants } from "framer-motion";

const EASE_OUT = "easeOut";

export function staggerContainer(staggerChildren: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren } },
  };
}

export function fadeInUp(offset = 12, duration = 0.3): Variants {
  return {
    hidden: { opacity: 0, y: offset },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
  };
}

export function fadeInLeft(offset = 8, duration = 0.25): Variants {
  return {
    hidden: { opacity: 0, x: -offset },
    visible: { opacity: 1, x: 0, transition: { duration, ease: EASE_OUT } },
  };
}

export const tabSwitch = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2, ease: EASE_OUT },
} as const;
