import { useMediaQuery } from "usehooks-ts";
import { DashboardMobileNavbar } from "./dashboard-mobile";
import { DashboardDesktopNavbar } from "./dashboard-navbar";

export function DashboardNavbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile && <DashboardMobileNavbar />}
      {!isMobile && <DashboardDesktopNavbar />}
    </>
  );
}
