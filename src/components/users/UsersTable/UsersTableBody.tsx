import { Spinner } from "@/components/ui/Spinner";
import type { User } from "@/types/user";
import { UsersTableMessageRow } from "./UsersTableMessageRow";
import { UsersTableRow } from "./UsersTableRow";

interface UsersTableBodyProps {
  users: User[];
  columnCount: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onSelect: (user: User) => void;
}

export function UsersTableBody({
  users,
  columnCount,
  isLoading,
  isError,
  onRetry,
  onSelect,
}: UsersTableBodyProps) {
  if (isLoading) {
    return (
      <tbody>
        <UsersTableMessageRow colSpan={columnCount}>
          <Spinner className="mx-auto h-6 w-6" />
        </UsersTableMessageRow>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <UsersTableMessageRow colSpan={columnCount} className="text-sm text-body">
          Couldn&apos;t load users.{" "}
          <button type="button" onClick={onRetry} className="font-medium text-secondary hover:underline">
            Try again
          </button>
        </UsersTableMessageRow>
      </tbody>
    );
  }

  if (!users.length) {
    return (
      <tbody>
        <UsersTableMessageRow colSpan={columnCount} className="italic text-text-muted">
          No users match the selected filters.
        </UsersTableMessageRow>
      </tbody>
    );
  }

  return (
    <tbody>
      {users.map((user, index) => (
        <UsersTableRow key={user.id} user={user} index={index} onSelect={onSelect} />
      ))}
    </tbody>
  );
}
