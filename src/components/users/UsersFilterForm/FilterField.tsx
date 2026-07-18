import type { InputHTMLAttributes } from "react";
import styles from "./FilterControl.module.scss";

interface FilterFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FilterField({ label, ...props }: FilterFieldProps) {
  return (
    <label className={styles.label}>
      {label}
      <input className={styles.control} {...props} />
    </label>
  );
}
