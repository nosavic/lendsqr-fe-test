import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "outline-danger" | "outline-secondary";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  "outline-danger": styles.outlineDanger,
  "outline-secondary": styles.outlineSecondary,
};

export function Button({ variant = "primary", className, children, disabled, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={disabled}
      className={`${styles.button} ${VARIANT_CLASS[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
