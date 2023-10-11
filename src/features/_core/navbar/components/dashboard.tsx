import { useMediaQuery } from "usehooks-ts";
import { DashboardMobileNavbar } from "./dashboard-mobile";
import { DashboardDesktopNavbar } from "./dashboard-desktop";
import { useRouter } from "next/router";

export function DashboardNavbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const groupId = useRouter().query.groupId as string;

  return (
    <>
      {isMobile && groupId && <DashboardMobileNavbar />}
      {!isMobile && <DashboardDesktopNavbar />}
    </>
  );
}
