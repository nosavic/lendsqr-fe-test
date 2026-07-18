import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline-danger" | "outline-secondary";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-white hover:bg-secondary-hover disabled:opacity-60",
  "outline-danger":
    "border border-status-blacklisted text-status-blacklisted hover:bg-status-blacklisted hover:text-white",
  "outline-secondary":
    "border border-secondary text-secondary hover:bg-secondary hover:text-white",
};

export function Button({ variant = "primary", className, children, disabled, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg px-6 text-sm font-semibold uppercase tracking-wider transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
