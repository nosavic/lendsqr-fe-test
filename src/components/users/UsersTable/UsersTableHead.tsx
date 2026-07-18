import { FilterIcon } from "@/components/icons";
import styles from "./UsersTableHead.module.scss";

interface UsersTableHeadProps {
  columns: readonly string[];
  onToggleFilter: () => void;
}

export function UsersTableHead({ columns, onToggleFilter }: UsersTableHeadProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column} className={styles.heading}>
            <div className={styles.headingInner}>
              {column}
              <button
                type="button"
                onClick={onToggleFilter}
                className={styles.filterButton}
                aria-label={`Filter by ${column}`}
              >
                <FilterIcon className={styles.filterIcon} />
              </button>
            </div>
          </th>
        ))}
        <th className={styles.actionsColumn} />
      </tr>
    </thead>
  );
}
