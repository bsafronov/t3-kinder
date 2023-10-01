import { useRouter } from "next/router";
import { IntroLayout } from "./intro-layout";
import { DashboardLayout } from "./dashboard-layout";

export function Layout({ children }: { children?: React.ReactNode }) {
  const { pathname } = useRouter();

  if (pathname.includes("dashboard")) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return <IntroLayout>{children}</IntroLayout>;
}
