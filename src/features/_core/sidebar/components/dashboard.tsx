import { useMediaQuery } from "usehooks-ts";
import { DashboardDesktopSidebar } from "./desktop";
import { DashboardMobileSidebar } from "./dashboard-mobile";

export function DashboardSidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {!isMobile && <DashboardDesktopSidebar />}
      {isMobile && <DashboardMobileSidebar />}
    </>
  );
}
