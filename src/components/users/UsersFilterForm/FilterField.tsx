import type { InputHTMLAttributes } from "react";

export const FILTER_CONTROL_CLASS =
  "w-full rounded-lg border border-border-strong bg-surface px-3 py-2.5 text-sm text-primary outline-none focus:border-secondary";

interface FilterFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FilterField({ label, ...props }: FilterFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
      {label}
      <input className={FILTER_CONTROL_CLASS} {...props} />
    </label>
  );
}
