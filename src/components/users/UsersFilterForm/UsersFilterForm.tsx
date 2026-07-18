import { useState } from "react";
import type { FormEvent } from "react";
import { STATUS_CONFIG, STATUS_OPTIONS } from "@/constants/status";
import { EMPTY_USER_FILTERS } from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";
import { FilterField } from "./FilterField";
import { FilterSelect } from "./FilterSelect";

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
      className="w-[270px] rounded-lg border border-card-line bg-surface p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-col gap-4">
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

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-border-strong py-2.5 text-sm font-medium text-body transition-colors hover:bg-surface-hover"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-secondary py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary-hover"
          >
            Filter
          </button>
        </div>
      </div>
    </form>
  );
}
