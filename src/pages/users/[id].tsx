import { useState } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserSummaryCard } from "@/components/user-details/UserSummaryCard";
import { GeneralDetails } from "@/components/user-details/GeneralDetails";
import { InfoField } from "@/components/user-details/InfoField";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorState } from "@/components/ui/ErrorState";
import { ArrowLeftIcon } from "@/components/icons";
import { useUser } from "@/hooks/useUser";
import type { UserDetailTab } from "@/constants/user-detail-tabs";
import type { User } from "@/types/user";
import type { NextPageWithLayout } from "@/pages/_app";

function EmptyTab({ message }: { message: string }) {
  return <p className="py-16 text-center text-sm text-body">{message}</p>;
}

function TabContent({ tab, user }: { tab: UserDetailTab; user: User }) {
  switch (tab) {
    case "General Details":
      return <GeneralDetails user={user} />;
    case "Bank Details":
      return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <InfoField label="Bank Name" value={user.bankName} />
          <InfoField label="Account Number" value={user.accountNumber} />
        </div>
      );
    case "Loans":
      return (
        <EmptyTab message={user.hasLoans ? "Loan history is not available yet." : "This user has no active loans."} />
      );
    case "Savings":
      return (
        <EmptyTab message={user.hasSavings ? "Savings history is not available yet." : "This user has no savings records."} />
      );
    case "Documents":
      return <EmptyTab message="No documents available." />;
    case "App and System":
      return <EmptyTab message="No app and system information available." />;
    default:
      return null;
  }
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const pageContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const UserDetailsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : undefined;
  const { user, isLoading, isError, isNotFound, refetch } = useUser(id);
  const [activeTab, setActiveTab] = useState<UserDetailTab>("General Details");

  const backLink = (
    <motion.div variants={sectionVariants}>
      <Link
        href="/users"
        className="mb-6 flex w-fit items-center gap-2 text-base text-body transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Users
      </Link>
    </motion.div>
  );

  return (
    <>
      <Head>
        <title>{user ? `${user.fullName} | lendsqr` : "User Details | lendsqr"}</title>
      </Head>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageContainerVariants}
        className="px-4 py-8 sm:px-6 lg:px-12 lg:py-14"
      >
        {backLink}

        {isNotFound ? (
          <motion.div variants={sectionVariants}>
            <ErrorState title="User not found" message="We couldn't find the user you're looking for." />
          </motion.div>
        ) : isError && !user ? (
          <motion.div variants={sectionVariants}>
            <ErrorState onRetry={refetch} message="We couldn't load this user. Please try again." />
          </motion.div>
        ) : isLoading && !user ? (
          <motion.div
            variants={sectionVariants}
            className="flex justify-center py-24"
          >
            <Spinner className="h-8 w-8" />
          </motion.div>
        ) : user ? (
          <>
            <motion.div
              variants={sectionVariants}
              className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h1 className="text-2xl font-medium text-primary">User Details</h1>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline-danger" className="h-10">
                  Blacklist User
                </Button>
                <Button variant="outline-secondary" className="h-10">
                  Activate User
                </Button>
              </div>
            </motion.div>

            <motion.div variants={sectionVariants}>
              <UserSummaryCard user={user} activeTab={activeTab} onTabChange={setActiveTab} />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="mt-6 overflow-hidden rounded-lg bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] md:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <TabContent tab={activeTab} user={user} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        ) : null}
      </motion.div>
    </>
  );
};

UserDetailsPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default UserDetailsPage;
