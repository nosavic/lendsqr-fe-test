import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import type { User } from "@/types/user";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/Spinner";
import { UserActionsMenu } from "@/components/users/UserActionsMenu";
import { UsersFilterForm } from "@/components/users/UsersFilterForm";
import { FilterIcon } from "@/components/icons";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useUsers } from "@/hooks/useUsers";
import { useUserOrganizations } from "@/hooks/useUserOrganizations";
import { formatDate } from "@/lib/format";
import { writeCachedUser } from "@/lib/user-storage";
import { EMPTY_USER_FILTERS } from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";

const COLUMNS = ["Organization", "Username", "Email", "Phone Number", "Date Joined", "Status"];
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
    <div ref={cardRef} className="relative rounded-lg border border-card-line bg-surface px-5 pb-5 pt-2">
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-5 top-14 z-30"
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

      <div className={`overflow-x-auto transition-opacity ${isFetching && !isLoading ? "opacity-50" : ""}`}>
        <table className="w-full min-w-[900px] border-collapse text-left text-sm text-body">
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th key={column} className="whitespace-nowrap px-2 py-3 text-xs font-semibold uppercase text-body">
                  <div className="flex items-center gap-1.5">
                    {column}
                    <button
                      type="button"
                      onClick={() => setFilterOpen((open) => !open)}
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
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-2 py-16 text-center">
                  <Spinner className="mx-auto h-6 w-6" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-2 py-16 text-center text-sm text-body">
                  Couldn&apos;t load users.{" "}
                  <button type="button" onClick={refetch} className="font-medium text-secondary hover:underline">
                    Try again
                  </button>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-2 py-16 text-center italic text-text-muted">
                  No users match the selected filters.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  onClick={() => goToDetails(user)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ duration: 0.2, delay: Math.min(index, 8) * 0.03 }}
                  className="cursor-pointer border-t border-border-subtle transition-colors hover:bg-surface-hover"
                >
                  <td className="max-w-[160px] truncate px-2 py-4">{user.organization}</td>
                  <td className="px-2 py-4">{user.username}</td>
                  <td className="max-w-[200px] truncate px-2 py-4">{user.email}</td>
                  <td className="whitespace-nowrap px-2 py-4">{user.phoneNumber}</td>
                  <td className="whitespace-nowrap px-2 py-4">{formatDate(user.dateJoined)}</td>
                  <td className="px-2 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-2 py-4 text-right" onClick={(event) => event.stopPropagation()}>
                    <UserActionsMenu onView={() => goToDetails(user)} />
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pt-5">
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
