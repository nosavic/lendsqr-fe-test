import type { ReactNode } from "react";

interface UsersTableMessageRowProps {
  colSpan: number;
  className?: string;
  children: ReactNode;
}

export function UsersTableMessageRow({ colSpan, className, children }: UsersTableMessageRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={`px-2 py-16 text-center ${className ?? ""}`}>
        {children}
      </td>
    </tr>
  );
}
