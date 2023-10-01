import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DashboardNavbar } from "../../navbar";
import { DashboardSidebar } from "../../sidebar";
import Head from "next/head";

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const { group } = router.query;

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Мои дети. Дашбоард</title>
        <meta name="description" content="Создано с любовью для воспитателей" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardNavbar />
      <div className="container mt-4 flex gap-4">
        {group && <DashboardSidebar />}
        {children}
      </div>
    </>
  );
}
