import { Button } from "@/components/ui/Button";
import styles from "./UserDetailsHeader.module.scss";

export function UserDetailsHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>User Details</h1>
      <div className={styles.actions}>
        <Button variant="outline-danger">Blacklist User</Button>
        <Button variant="outline-secondary">Activate User</Button>
      </div>
    </div>
  );
}
