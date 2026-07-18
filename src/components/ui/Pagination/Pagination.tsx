import { motion } from "framer-motion";
import { ChevronDownIcon } from "@/components/icons";
import { buildPageRange } from "@/lib/pagination";
import styles from "./Pagination.module.scss";

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
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className={styles.pagination}>
      <div className={styles.summary}>
        <span>Showing</span>
        <div className={styles.selectWrapper}>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className={styles.select}
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <ChevronDownIcon className={styles.selectIcon} />
        </div>
        <span>out of {total.toLocaleString()}</span>
      </div>

      <div className={styles.controls}>
        <motion.button
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(page - 1)}
          whileHover={isFirst ? undefined : { scale: 1.08 }}
          whileTap={isFirst ? undefined : { scale: 0.92 }}
          className={styles.arrow}
          aria-label="Previous page"
        >
          <ChevronDownIcon className={`${styles.arrowIcon} ${styles.prevIcon}`} />
        </motion.button>

        <div className={styles.pages}>
          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <motion.button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-current={item === page ? "page" : undefined}
                className={`${styles.page} ${item === page ? styles.currentPage : ""}`}
              >
                {item}
              </motion.button>
            ),
          )}
        </div>

        <motion.button
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(page + 1)}
          whileHover={isLast ? undefined : { scale: 1.08 }}
          whileTap={isLast ? undefined : { scale: 0.92 }}
          className={styles.arrow}
          aria-label="Next page"
        >
          <ChevronDownIcon className={`${styles.arrowIcon} ${styles.nextIcon}`} />
        </motion.button>
      </div>
    </div>
  );
}
