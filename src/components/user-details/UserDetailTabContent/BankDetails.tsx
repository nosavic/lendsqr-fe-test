import { InfoField } from "@/components/user-details/InfoField";
import type { User } from "@/types/user";
import styles from "./TabContent.module.scss";

interface BankDetailsProps {
  user: User;
}

export function BankDetails({ user }: BankDetailsProps) {
  return (
    <div className={styles.bankGrid}>
      <InfoField label="Bank Name" value={user.bankName} />
      <InfoField label="Account Number" value={user.accountNumber} />
    </div>
  );
}
