import Head from "next/head";
import type { ReactElement } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useUserStats } from "@/hooks/useUserStats";
import { UserStats, UsersTable } from "@/components/users";
import type { NextPageWithLayout } from "@/types/next-page";
import styles from "./Users.module.scss";

const UsersPage: NextPageWithLayout = () => {
  const { stats } = useUserStats();

  return (
    <>
      <Head>
        <title>Users | lendsqr</title>
      </Head>

      <div className={styles.page}>
        <h1 className={styles.title}>Users</h1>
        <UserStats stats={stats} />
        <UsersTable />
      </div>
    </>
  );
};

UsersPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;
