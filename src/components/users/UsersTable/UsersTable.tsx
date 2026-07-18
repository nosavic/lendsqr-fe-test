import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { Pagination } from "@/components/ui/Pagination";
import { UsersFilterForm } from "@/components/users/UsersFilterForm";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useUsers } from "@/hooks/useUsers";
import { useUserOrganizations } from "@/hooks/useUserOrganizations";
import { writeCachedUser } from "@/lib/user-storage";
import { EMPTY_USER_FILTERS } from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";
import type { User } from "@/types/user";
import { UsersTableBody } from "./UsersTableBody";
import { UsersTableHead } from "./UsersTableHead";
import styles from "./UsersTable.module.scss";

const COLUMNS = ["Organization", "Username", "Email", "Phone Number", "Date Joined", "Status"] as const;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const DEFAULT_PAGE_SIZE = 5;

export function UsersTable() {
  const router = useRouter();
  const [filters, setFilters] = useState<UserFilters>(EMPTY_USER_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const cardRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(cardRef, () => setFilterOpen(false), filterOpen);

  const organizations = useUserOrganizations();
  const { users, total, isLoading, isFetching, isError, refetch } = useUsers({ page, pageSize, filters });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function applyFilters(next: UserFilters) {
    setFilters(next);
    setFilterOpen(false);
    setPage(1);
  }

  function resetFilters() {
    setFilters(EMPTY_USER_FILTERS);
    setFilterOpen(false);
    setPage(1);
  }

  function changePageSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function goToDetails(user: User) {
    writeCachedUser(user);
    setFilterOpen(false);
    router.push(`/users/${user.id}`);
  }

  return (
    <div ref={cardRef} className={styles.card}>
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={styles.filterPanel}
          >
            <UsersFilterForm
              organizations={organizations}
              initialValues={filters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${styles.tableWrap} ${isFetching && !isLoading ? styles.refreshing : ""}`}>
        <table className={styles.table}>
          <UsersTableHead columns={COLUMNS} onToggleFilter={() => setFilterOpen((open) => !open)} />
          <UsersTableBody
            users={users}
            columnCount={COLUMNS.length + 1}
            isLoading={isLoading}
            isError={isError}
            onRetry={refetch}
            onSelect={goToDetails}
          />
        </table>
      </div>

      <div className={styles.pagination}>
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          onPageChange={setPage}
          onPageSizeChange={changePageSize}
        />
      </div>
    </div>
  );
}
