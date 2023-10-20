import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DashboardNavbar } from "../../navbar";
import { DashboardSidebar } from "../../sidebar";
import Head from "next/head";
import { Breadcrumbs } from "~/shared/components/breadcrumbs";

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const { groupId } = router.query;

  if (status === "unauthenticated") {
    void router.push("/");
  }

  console.log(router.pathname);
  return (
    <>
      <Head>
        <title>Мои дети. Доска</title>
        <meta name="description" content="Создано с любовью для воспитателей" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <DashboardNavbar />

        <div className="mx-auto mb-24 mt-4 flex w-full max-w-screen-xl grow items-start gap-4 px-2 md:mb-8 md:px-4">
          {groupId && <DashboardSidebar />}
          <main className="min-h-full grow">
            <Breadcrumbs />
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
