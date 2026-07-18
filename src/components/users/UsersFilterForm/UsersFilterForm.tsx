import { useState } from "react";
import type { FormEvent } from "react";
import { STATUS_CONFIG, STATUS_OPTIONS } from "@/constants/status";
import { EMPTY_USER_FILTERS } from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";
import { FilterField } from "./FilterField";
import { FilterSelect } from "./FilterSelect";
import styles from "./UsersFilterForm.module.scss";

interface UsersFilterFormProps {
  organizations: string[];
  initialValues: UserFilters;
  onApply: (filters: UserFilters) => void;
  onReset: () => void;
}

export function UsersFilterForm({ organizations, initialValues, onApply, onReset }: UsersFilterFormProps) {
  const [draft, setDraft] = useState<UserFilters>(initialValues);

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

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div className={styles.fields}>
        <FilterSelect
          label="Organization"
          value={draft.organization}
          onChange={(event) => update({ organization: event.target.value })}
          options={organizations.map((organization) => ({ value: organization, label: organization }))}
        />

        <FilterField
          label="Username"
          placeholder="User"
          value={draft.username}
          onChange={(event) => update({ username: event.target.value })}
        />

        <FilterField
          label="Email"
          type="email"
          placeholder="Email"
          value={draft.email}
          onChange={(event) => update({ email: event.target.value })}
        />

        <FilterField
          label="Date"
          type="date"
          value={draft.date}
          onChange={(event) => update({ date: event.target.value })}
        />

        <FilterField
          label="Phone Number"
          placeholder="Phone Number"
          value={draft.phoneNumber}
          onChange={(event) => update({ phoneNumber: event.target.value })}
        />

        <FilterSelect
          label="Status"
          value={draft.status}
          onChange={(event) => update({ status: event.target.value as UserFilters["status"] })}
          options={STATUS_OPTIONS.map((status) => ({ value: status, label: STATUS_CONFIG[status].label }))}
        />

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.reset}
          >
            Reset
          </button>
          <button
            type="submit"
            className={styles.submit}
          >
            Filter
          </button>
        </div>
      </div>
    </form>
  );
}
