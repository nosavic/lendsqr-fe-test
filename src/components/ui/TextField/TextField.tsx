import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  trailing?: ReactNode;
}

export function TextField({ trailing, className, ...props }: TextFieldProps) {
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${trailing ? styles.hasTrailing : ""} ${className ?? ""}`}
        {...props}
      />
      {trailing && <div className={styles.trailing}>{trailing}</div>}
    </div>
  );
}
