import type { SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "@/components/icons";
import styles from "./FilterControl.module.scss";

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: FilterSelectOption[];
}

export function FilterSelect({ label, options, ...props }: FilterSelectProps) {
  return (
    <label className={styles.label}>
      {label}
      <div className={styles.selectWrap}>
        <select className={`${styles.control} ${styles.select}`} {...props}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className={styles.caret} />
      </div>
    </label>
  );
}
