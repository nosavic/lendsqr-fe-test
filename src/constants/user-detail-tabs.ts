export const USER_DETAIL_TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;

export type UserDetailTab = (typeof USER_DETAIL_TABS)[number];
