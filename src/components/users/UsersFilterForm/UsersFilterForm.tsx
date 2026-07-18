import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { STATUS_CONFIG, STATUS_OPTIONS } from "@/constants/status";
import { EMPTY_USER_FILTERS, countActiveFilters } from "@/lib/user-filters";
import type { FilterField as FilterFieldName, UserFilters } from "@/lib/user-filters";
import { FilterField } from "./FilterField";
import { FilterSelect } from "./FilterSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import styles from "./UsersFilterForm.module.scss";

interface UsersFilterFormProps {
  organizations: string[];
  initialValues: UserFilters;
  focusField: FilterFieldName | null;
  maxHeight?: number;
  onApply: (filters: UserFilters) => void;
  onReset: () => void;
  onDismiss: () => void;
}

export function UsersFilterForm({
  organizations,
  initialValues,
  focusField,
  maxHeight,
  onApply,
  onReset,
  onDismiss,
}: UsersFilterFormProps) {
  const [draft, setDraft] = useState<UserFilters>(initialValues);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!focusField) return;
    const control = formRef.current?.querySelector<HTMLElement>(`[data-field="${focusField}"]`);
    control?.focus();
  }, [focusField]);

  function update(patch: Partial<UserFilters>) {
    setDraft((previous) => ({ ...previous, ...patch }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onApply(draft);
  }

  function handleReset() {
    setDraft(EMPTY_USER_FILTERS);
    onReset();
  }

  const activeCount = countActiveFilters(draft);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onDismiss();
        }
      }}
      className={styles.form}
      style={{ maxHeight }}
      noValidate
      role="dialog"
      aria-label="Filter users"
    >
      <div className={styles.fields}>
        <FilterSelect
          label="Organization"
          data-field="organization"
          value={draft.organization}
          onChange={(event) => update({ organization: event.target.value })}
          options={organizations.map((organization) => ({ value: organization, label: organization }))}
        />

        <FilterField
          label="Username"
          data-field="username"
          placeholder="User"
          value={draft.username}
          onChange={(event) => update({ username: event.target.value })}
        />

        <FilterField
          label="Email"
          data-field="email"
          placeholder="Email"
          value={draft.email}
          onChange={(event) => update({ email: event.target.value })}
        />

        <DatePicker
          label="Date"
          data-field="date"
          value={draft.date}
          onChange={(date) => update({ date })}
        />

        <FilterField
          label="Phone Number"
          data-field="phoneNumber"
          placeholder="Phone Number"
          value={draft.phoneNumber}
          onChange={(event) => update({ phoneNumber: event.target.value })}
        />

        <FilterSelect
          label="Status"
          data-field="status"
          value={draft.status}
          onChange={(event) => update({ status: event.target.value as UserFilters["status"] })}
          options={STATUS_OPTIONS.map((status) => ({ value: status, label: STATUS_CONFIG[status].label }))}
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleReset}
          className={styles.reset}
          disabled={activeCount === 0}
        >
          Reset
        </button>
        <button type="submit" className={styles.submit}>
          Filter
        </button>
      </div>
    </form>
  );
}
