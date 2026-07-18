import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface PopoverRenderProps {
  close: () => void;
}

interface PopoverProps {
  trigger: (state: { open: boolean; toggle: () => void }) => ReactNode;
  children: (props: PopoverRenderProps) => ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function Popover({ trigger, children, align = "right", className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setOpen(false), open);

  const toggle = () => setOpen((value) => !value);
  const close = () => setOpen(false);

  return (
    <div ref={containerRef} className="relative">
      {trigger({ open, toggle })}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
            className={`absolute top-full z-50 mt-2 ${align === "right" ? "right-0" : "left-0"} ${className ?? ""}`}
          >
            {children({ close })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
