import { useRouter } from "next/router";
import { IntroLayout } from "./intro-layout";
import { DashboardLayout } from "./dashboard-layout";

export function Layout({ children }: { children?: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <>
      {pathname.includes("dashboard") && (
        <DashboardLayout>{children}</DashboardLayout>
      )}
      {!pathname.includes("dashboard") && <IntroLayout>{children}</IntroLayout>}
    </>
  );
}
