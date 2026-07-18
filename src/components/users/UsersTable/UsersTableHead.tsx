import { FilterIcon } from "@/components/icons";

interface UsersTableHeadProps {
  columns: readonly string[];
  onToggleFilter: () => void;
}

export function UsersTableHead({ columns, onToggleFilter }: UsersTableHeadProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column} className="whitespace-nowrap px-2 py-3 text-xs font-semibold uppercase text-body">
            <div className="flex items-center gap-1.5">
              {column}
              <button
                type="button"
                onClick={onToggleFilter}
                className="rounded p-0.5 text-body transition-colors hover:bg-surface-hover"
                aria-label={`Filter by ${column}`}
              >
                <FilterIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </th>
        ))}
        <th className="px-2 py-3" />
      </tr>
    </thead>
  );
}
