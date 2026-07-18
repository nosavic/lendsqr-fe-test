import { useState } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BackToUsersLink } from "@/components/user-details/BackToUsersLink";
import { UserDetailsHeader } from "@/components/user-details/UserDetailsHeader";
import { UserSummaryCard } from "@/components/user-details/UserSummaryCard";
import { UserDetailTabContent } from "@/components/user-details/UserDetailTabContent";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorState } from "@/components/ui/ErrorState";
import { useUser } from "@/hooks/useUser";
import { fadeInUp, staggerContainer, tabSwitch } from "@/lib/animations";
import type { UserDetailTab } from "@/constants/user-detail-tabs";
import type { NextPageWithLayout } from "@/types/next-page";
import styles from "./UserDetails.module.scss";

const sectionVariants = fadeInUp(14);
const containerVariants = staggerContainer(0.08);

const UserDetailsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : undefined;
  const { user, isLoading, isError, isNotFound, refetch } = useUser(id);
  const [activeTab, setActiveTab] = useState<UserDetailTab>("General Details");

  function renderContent() {
    if (isNotFound) {
      return <ErrorState title="User not found" message="We couldn't find the user you're looking for." />;
    }

    if (isError && !user) {
      return <ErrorState onRetry={refetch} message="We couldn't load this user. Please try again." />;
    }

    if (isLoading && !user) {
      return (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      );
    }

    if (!user) return null;

    return (
      <>
        <motion.div variants={sectionVariants}>
          <UserDetailsHeader />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <UserSummaryCard user={user} activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className={styles.tabPanel}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeTab} {...tabSwitch}>
              <UserDetailTabContent tab={activeTab} user={user} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{user ? `${user.fullName} | lendsqr` : "User Details | lendsqr"}</title>
      </Head>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={styles.page}
      >
        <motion.div variants={sectionVariants}>
          <BackToUsersLink />
        </motion.div>

        {renderContent()}
      </motion.div>
    </>
  );
};

UserDetailsPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default UserDetailsPage;
