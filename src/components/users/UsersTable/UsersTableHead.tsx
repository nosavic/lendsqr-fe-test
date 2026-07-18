import { FilterIcon } from "@/components/icons";
import type { UserColumn } from "@/constants/user-columns";
import type { FilterField } from "@/lib/user-filters";
import styles from "./UsersTableHead.module.scss";

interface UsersTableHeadProps {
  columns: UserColumn[];
  activeFields: FilterField[];
  openField: FilterField | null;
  onFilterClick: (field: FilterField, trigger: HTMLElement) => void;
}

export function UsersTableHead({ columns, activeFields, openField, onFilterClick }: UsersTableHeadProps) {
  return (
    <thead>
      <tr>
        {columns.map(({ label, field }) => {
          const isActive = activeFields.includes(field);
          const isOpen = openField === field;

          return (
            <th key={field} className={styles.heading} scope="col">
              <div className={styles.headingInner}>
                {label}
                <button
                  type="button"
                  onClick={(event) => onFilterClick(field, event.currentTarget)}
                  className={`${styles.filterButton} ${isActive ? styles.filterActive : ""} ${isOpen ? styles.filterOpen : ""}`}
                  aria-label={isActive ? `Filter by ${label} (active)` : `Filter by ${label}`}
                  aria-expanded={isOpen}
                  aria-haspopup="dialog"
                >
                  <FilterIcon className={styles.filterIcon} />
                </button>
              </div>
            </th>
          );
        })}
        <th className={styles.actionsColumn} />
      </tr>
    </thead>
  );
}
