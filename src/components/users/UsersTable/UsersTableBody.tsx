import { Spinner } from "@/components/ui/Spinner";
import type { User } from "@/types/user";
import { UsersTableMessageRow } from "./UsersTableMessageRow";
import { UsersTableRow } from "./UsersTableRow";
import styles from "./UsersTableMessageRow.module.scss";

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
          <Spinner centered />
        </UsersTableMessageRow>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <UsersTableMessageRow colSpan={columnCount} className={styles.error}>
          Couldn&apos;t load users.{" "}
          <button type="button" onClick={onRetry} className={styles.retry}>
            Try again
          </button>
        </UsersTableMessageRow>
      </tbody>
    );
  }

  if (!users.length) {
    return (
      <tbody>
        <UsersTableMessageRow colSpan={columnCount} className={styles.empty}>
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
