import Head from "next/head";
import type { ReactElement } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserStats } from "@/components/users/UserStats";
import { useUserStats } from "@/hooks/useUserStats";
import type { NextPageWithLayout } from "@/pages/_app";

const Dashboard: NextPageWithLayout = () => {
  const { stats } = useUserStats();

  return (
    <>
      <Head>
        <title>Dashboard | lendsqr</title>
      </Head>

      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-12 lg:py-16">
        <h1 className="text-2xl font-medium tracking-[-0.5px] text-primary">Dashboard</h1>
        <UserStats stats={stats} />
      </div>
    </>
  );
};

Dashboard.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
