import { GeneralDetails } from "@/components/user-details/GeneralDetails";
import type { UserDetailTab } from "@/constants/user-detail-tabs";
import type { User } from "@/types/user";
import { BankDetails } from "./BankDetails";
import { EmptyTab } from "./EmptyTab";

interface UserDetailTabContentProps {
  tab: UserDetailTab;
  user: User;
}

export function UserDetailTabContent({ tab, user }: UserDetailTabContentProps) {
  switch (tab) {
    case "General Details":
      return <GeneralDetails user={user} />;
    case "Bank Details":
      return <BankDetails user={user} />;
    case "Loans":
      return (
        <EmptyTab
          message={user.hasLoans ? "Loan history is not available yet." : "This user has no active loans."}
        />
      );
    case "Savings":
      return (
        <EmptyTab
          message={user.hasSavings ? "Savings history is not available yet." : "This user has no savings records."}
        />
      );
    case "Documents":
      return <EmptyTab message="No documents available." />;
    case "App and System":
      return <EmptyTab message="No app and system information available." />;
    default:
      return null;
  }
}
