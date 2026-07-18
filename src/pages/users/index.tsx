import Head from "next/head";
import type { ReactElement } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserStats } from "@/components/users/UserStats";
import { UsersTable } from "@/components/users/UsersTable";
import { useUserStats } from "@/hooks/useUserStats";
import type { NextPageWithLayout } from "@/types/next-page";

const UsersPage: NextPageWithLayout = () => {
  const { stats } = useUserStats();

  return (
    <>
      <Head>
        <title>Users | lendsqr</title>
      </Head>

      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-12 lg:py-16">
        <h1 className="text-2xl font-medium tracking-[-0.5px] text-primary">Users</h1>
        <UserStats stats={stats} />
        <UsersTable />
      </div>
    </>
  );
};

UsersPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;
