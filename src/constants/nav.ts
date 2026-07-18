import type { ComponentType, SVGProps } from "react";
import {
  SidebarAuditLogsIcon,
  SidebarDashboardIcon,
  SidebarDecisionModelIcon,
  SidebarFeesAndChargesIcon,
  SidebarFeesAndPricingIcon,
  SidebarGuarantorsIcon,
  SidebarKarmaIcon,
  SidebarLoanProductsIcon,
  SidebarLoanRequestsIcon,
  SidebarLoansIcon,
  SidebarOrganisationIcon,
  SidebarPreferencesIcon,
  SidebarReportsIcon,
  SidebarSavingsIcon,
  SidebarSavingsProductsIcon,
  SidebarServiceAccountsIcon,
  SidebarServicesIcon,
  SidebarSettlementsIcon,
  SidebarTransactionsIcon,
  SidebarUsersIcon,
  SidebarWhitelistIcon,
} from "@/components/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard", icon: SidebarDashboardIcon },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users", href: "/users", icon: SidebarUsersIcon },
      { label: "Guarantors", href: "#", icon: SidebarGuarantorsIcon },
      { label: "Loans", href: "#", icon: SidebarLoansIcon },
      { label: "Decision Models", href: "#", icon: SidebarDecisionModelIcon },
      { label: "Savings", href: "#", icon: SidebarSavingsIcon },
      { label: "Loan Requests", href: "#", icon: SidebarLoanRequestsIcon },
      { label: "Whitelist", href: "#", icon: SidebarWhitelistIcon },
      { label: "Karma", href: "#", icon: SidebarKarmaIcon },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { label: "Organization", href: "#", icon: SidebarOrganisationIcon },
      { label: "Loan Products", href: "#", icon: SidebarLoanProductsIcon },
      {
        label: "Savings Products",
        href: "#",
        icon: SidebarSavingsProductsIcon,
      },
      { label: "Fees and Charges", href: "#", icon: SidebarFeesAndChargesIcon },
      { label: "Transactions", href: "#", icon: SidebarTransactionsIcon },
      { label: "Services", href: "#", icon: SidebarServicesIcon },
      { label: "Service Account", href: "#", icon: SidebarServiceAccountsIcon },
      { label: "Settlements", href: "#", icon: SidebarSettlementsIcon },
      { label: "Reports", href: "#", icon: SidebarReportsIcon },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Preferences", href: "#", icon: SidebarPreferencesIcon },
      { label: "Fees and Pricing", href: "#", icon: SidebarFeesAndPricingIcon },
      { label: "Audit Logs", href: "#", icon: SidebarAuditLogsIcon },
    ],
  },
];

