import { motion } from "framer-motion";
import { ChevronDownIcon } from "@/components/icons";
import { buildPageRange } from "@/lib/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pages = buildPageRange(page, totalPages);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex items-center gap-2 text-sm text-body">
        <span>Showing</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="appearance-none rounded-lg bg-chip py-1.5 pl-3 pr-8 text-sm font-medium text-primary outline-none"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-primary" />
        </div>
        <span>out of {total.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          whileHover={page === 1 ? undefined : { scale: 1.08 }}
          whileTap={page === 1 ? undefined : { scale: 0.92 }}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-chip text-primary transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronDownIcon className="h-4 w-4 rotate-90" />
        </motion.button>

        <div className="flex items-center gap-1">
          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="flex h-8 w-8 items-center justify-center text-body">
                ...
              </span>
            ) : (
              <motion.button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm transition-colors ${
                  item === page ? "font-semibold text-primary" : "text-body hover:bg-surface-hover"
                }`}
              >
                {item}
              </motion.button>
            ),
          )}
        </div>

        <motion.button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          whileHover={page === totalPages ? undefined : { scale: 1.08 }}
          whileTap={page === totalPages ? undefined : { scale: 0.92 }}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-chip text-primary transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronDownIcon className="h-4 w-4 -rotate-90" />
        </motion.button>
      </div>
    </div>
  );
}
