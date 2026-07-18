import { useState } from "react";
import type { FormEvent } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { STATUS_CONFIG, STATUS_OPTIONS } from "@/constants/status";
import type { UserFilters } from "@/lib/user-filters";
import { EMPTY_USER_FILTERS } from "@/lib/user-filters";

interface UsersFilterFormProps {
  organizations: string[];
  initialValues: UserFilters;
  onApply: (filters: UserFilters) => void;
  onReset: () => void;
}

const FIELD_CLASS =
  "w-full rounded-lg border border-border-strong bg-surface px-3 py-2.5 text-sm text-primary outline-none focus:border-secondary";

export function UsersFilterForm({ organizations, initialValues, onApply, onReset }: UsersFilterFormProps) {
  const [draft, setDraft] = useState<UserFilters>(initialValues);

  function update(patch: Partial<UserFilters>) {
    setDraft((prev) => ({ ...prev, ...patch }));
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
        <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
          Organization
          <div className="relative">
            <select
              value={draft.organization}
              onChange={(event) => update({ organization: event.target.value })}
              className={`${FIELD_CLASS} appearance-none pr-9`}
            >
              <option value="">Select</option>
              {organizations.map((organization) => (
                <option key={organization} value={organization}>
                  {organization}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
          </div>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
          Username
          <input
            value={draft.username}
            onChange={(event) => update({ username: event.target.value })}
            placeholder="User"
            className={FIELD_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
          Email
          <input
            type="email"
            value={draft.email}
            onChange={(event) => update({ email: event.target.value })}
            placeholder="Email"
            className={FIELD_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
          Date
          <input
            type="date"
            value={draft.date}
            onChange={(event) => update({ date: event.target.value })}
            className={FIELD_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
          Phone Number
          <input
            value={draft.phoneNumber}
            onChange={(event) => update({ phoneNumber: event.target.value })}
            placeholder="Phone Number"
            className={FIELD_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-body">
          Status
          <div className="relative">
            <select
              value={draft.status}
              onChange={(event) => update({ status: event.target.value as UserFilters["status"] })}
              className={`${FIELD_CLASS} appearance-none pr-9`}
            >
              <option value="">Select</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {STATUS_CONFIG[status].label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
          </div>
        </label>

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
