import { InfoField } from "@/components/user-details/InfoField";
import type { User } from "@/types/user";

interface BankDetailsProps {
  user: User;
}

export function BankDetails({ user }: BankDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <InfoField label="Bank Name" value={user.bankName} />
      <InfoField label="Account Number" value={user.accountNumber} />
    </div>
  );
}
