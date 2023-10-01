import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DashboardNavbar } from "../../navbar";
import { DashboardSidebar } from "../../sidebar";

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <>
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        {children}
      </div>
    </>
  );
}
