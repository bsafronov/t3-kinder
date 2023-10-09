import { useRouter } from "next/router";
import { IntroLayout } from "./intro-layout";
import { DashboardLayout } from "./dashboard-layout";

export function Layout({ children }: { children?: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <div className="mb-32 md:mb-8">
      {pathname.includes("dashboard") && (
        <DashboardLayout>{children}</DashboardLayout>
      )}
      {!pathname.includes("dashboard") && <IntroLayout>{children}</IntroLayout>}
    </div>
  );
}
