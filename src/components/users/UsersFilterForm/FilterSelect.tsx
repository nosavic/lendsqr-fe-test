import type { SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { FILTER_CONTROL_CLASS } from "./FilterField";

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
    <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
      {label}
      <div className="relative">
        <select className={`${FILTER_CONTROL_CLASS} appearance-none pr-9`} {...props}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
      </div>
    </label>
  );
}
