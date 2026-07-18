import Head from "next/head";
import type { ReactElement } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserStats } from "@/components/users/UserStats";
import { useUserStats } from "@/hooks/useUserStats";
import type { NextPageWithLayout } from "@/types/next-page";
import styles from "./Dashboard.module.scss";

const Dashboard: NextPageWithLayout = () => {
  const { stats } = useUserStats();

  return (
    <>
      <Head>
        <title>Dashboard | lendsqr</title>
      </Head>

      <div className={styles.page}>
        <h1 className={styles.title}>Dashboard</h1>
        <UserStats stats={stats} />
      </div>
    </>
  );
};

Dashboard.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
