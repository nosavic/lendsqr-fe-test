import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { Pagination } from "@/components/ui/Pagination";
import { ActiveFilterChips } from "@/components/users/ActiveFilterChips";
import { UsersFilterForm } from "@/components/users/UsersFilterForm";
import { USER_COLUMNS } from "@/constants/user-columns";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useUsers } from "@/hooks/useUsers";
import { useUserOrganizations } from "@/hooks/useUserOrganizations";
import { writeCachedUser } from "@/lib/user-storage";
import { EMPTY_USER_FILTERS, activeFilters, clearFilterField } from "@/lib/user-filters";
import type { FilterField, UserFilters } from "@/lib/user-filters";
import type { User } from "@/types/user";
import { UsersTableBody } from "./UsersTableBody";
import { UsersTableHead } from "./UsersTableHead";
import styles from "./UsersTable.module.scss";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const DEFAULT_PAGE_SIZE = 5;
const PANEL_WIDTH = 270;
const PANEL_EDGE_GAP = 12;
const PANEL_TRIGGER_GAP = 8;
const PANEL_MIN_HEIGHT = 280;

interface PanelPosition {
  left: number;
  top?: number;
  bottom?: number;
  maxHeight: number;
  origin: string;
}

function computePanelPosition(trigger: HTMLElement, card: HTMLElement): PanelPosition {
  const cardBox = card.getBoundingClientRect();
  const triggerBox = trigger.getBoundingClientRect();

  const maxLeft = Math.max(PANEL_EDGE_GAP, cardBox.width - PANEL_WIDTH - PANEL_EDGE_GAP);
  const left = Math.min(
    Math.max(PANEL_EDGE_GAP, triggerBox.left - cardBox.left - PANEL_TRIGGER_GAP),
    maxLeft,
  );

  const spaceBelow = window.innerHeight - triggerBox.bottom - PANEL_TRIGGER_GAP - PANEL_EDGE_GAP;
  const spaceAbove = triggerBox.top - PANEL_TRIGGER_GAP - PANEL_EDGE_GAP;
  const placeBelow = spaceBelow >= PANEL_MIN_HEIGHT || spaceBelow >= spaceAbove;

  return placeBelow
    ? {
        left,
        top: triggerBox.bottom - cardBox.top + PANEL_TRIGGER_GAP,
        maxHeight: Math.max(PANEL_MIN_HEIGHT, spaceBelow),
        origin: "top left",
      }
    : {
        left,
        bottom: cardBox.bottom - triggerBox.top + PANEL_TRIGGER_GAP,
        maxHeight: Math.max(PANEL_MIN_HEIGHT, spaceAbove),
        origin: "bottom left",
      };
}

export function UsersTable() {
  const router = useRouter();
  const [filters, setFilters] = useState<UserFilters>(EMPTY_USER_FILTERS);
  const [openField, setOpenField] = useState<FilterField | null>(null);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closePanel = useCallback((returnFocus = false) => {
    setOpenField(null);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useOnClickOutside(cardRef, () => closePanel(), openField !== null);

  useEffect(() => {
    if (!openField) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openField, closePanel]);

  useEffect(() => {
    if (!openField) return;

    const reposition = () => {
      const trigger = triggerRef.current;
      const card = cardRef.current;
      if (trigger && card) setPanelPosition(computePanelPosition(trigger, card));
    };

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [openField]);

  const organizations = useUserOrganizations();
  const { users, total, isLoading, isFetching, isError, refetch } = useUsers({ page, pageSize, filters });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const activeFields = activeFilters(filters).map((entry) => entry.field);

  function handleFilterClick(field: FilterField, trigger: HTMLElement) {
    if (openField === field) {
      closePanel(true);
      return;
    }

    const card = cardRef.current;
    if (card) setPanelPosition(computePanelPosition(trigger, card));

    triggerRef.current = trigger;
    setOpenField(field);
  }

  function applyFilters(next: UserFilters) {
    setFilters(next);
    closePanel(true);
    setPage(1);
  }

  function resetFilters() {
    setFilters(EMPTY_USER_FILTERS);
    closePanel(true);
    setPage(1);
  }

  function removeFilter(field: FilterField) {
    setFilters((current) => clearFilterField(current, field));
    setPage(1);
  }

  function changePageSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function goToDetails(user: User) {
    writeCachedUser(user);
    closePanel();
    router.push(`/users/${user.id}`);
  }

  return (
    <div ref={cardRef} className={styles.card}>
      <AnimatePresence>
        {openField && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              left: panelPosition?.left,
              top: panelPosition?.top,
              bottom: panelPosition?.bottom,
              transformOrigin: panelPosition?.origin,
            }}
            className={styles.filterPanel}
          >
            <UsersFilterForm
              organizations={organizations}
              initialValues={filters}
              focusField={openField}
              maxHeight={panelPosition?.maxHeight}
              onApply={applyFilters}
              onReset={resetFilters}
              onDismiss={() => closePanel(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${styles.tableWrap} ${isFetching && !isLoading ? styles.refreshing : ""}`}>
        <table className={styles.table}>
          <UsersTableHead
            columns={USER_COLUMNS}
            activeFields={activeFields}
            openField={openField}
            onFilterClick={handleFilterClick}
          />
          <UsersTableBody
            users={users}
            columnCount={USER_COLUMNS.length + 1}
            isLoading={isLoading}
            isError={isError}
            onRetry={refetch}
            onSelect={goToDetails}
          />
        </table>
      </div>

      <ActiveFilterChips
        filters={filters}
        total={total}
        onRemove={removeFilter}
        onClearAll={() => {
          setFilters(EMPTY_USER_FILTERS);
          setPage(1);
        }}
      />

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
