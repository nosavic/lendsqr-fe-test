import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { shellTransition } from "./transitions";

interface ShellTransitionProps {
  shellKey: string;
  children: ReactNode;
}

export function ShellTransition({ shellKey, children }: ShellTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={shellKey}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={shellTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
