import { AnimatePresence, motion } from "framer-motion";
import { activeFilters } from "@/lib/user-filters";
import type { FilterField, UserFilters } from "@/lib/user-filters";
import { STATUS_CONFIG } from "@/constants/status";
import styles from "./ActiveFilterChips.module.scss";

interface ActiveFilterChipsProps {
  filters: UserFilters;
  total: number;
  onRemove: (field: FilterField) => void;
  onClearAll: () => void;
}

function displayValue(field: FilterField, value: string): string {
  if (field === "status") return STATUS_CONFIG[value as keyof typeof STATUS_CONFIG]?.label ?? value;
  return value;
}

export function ActiveFilterChips({ filters, total, onRemove, onClearAll }: ActiveFilterChipsProps) {
  const active = activeFilters(filters);
  if (!active.length) return null;

  return (
    <div className={styles.bar} role="status" aria-live="polite">
      <span className={styles.summary}>
        {total.toLocaleString()} {total === 1 ? "result" : "results"}
      </span>

      <AnimatePresence initial={false}>
        {active.map(({ field, label, value }) => (
          <motion.button
            key={field}
            type="button"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={() => onRemove(field)}
            className={styles.chip}
            aria-label={`Remove ${label} filter`}
          >
            <span className={styles.chipLabel}>{label}:</span>
            <span className={styles.chipValue}>{displayValue(field, value)}</span>
            <span className={styles.remove} aria-hidden="true">
              ×
            </span>
          </motion.button>
        ))}
      </AnimatePresence>

      {active.length > 1 && (
        <button type="button" onClick={onClearAll} className={styles.clearAll}>
          Clear all
        </button>
      )}
    </div>
  );
}
