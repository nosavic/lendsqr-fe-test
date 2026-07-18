import type { ReactNode } from "react";
import styles from "./UsersTableMessageRow.module.scss";

interface UsersTableMessageRowProps {
  colSpan: number;
  className?: string;
  children: ReactNode;
}

export function UsersTableMessageRow({ colSpan, className, children }: UsersTableMessageRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={`${styles.cell} ${className ?? ""}`}>
        {children}
      </td>
    </tr>
  );
}
