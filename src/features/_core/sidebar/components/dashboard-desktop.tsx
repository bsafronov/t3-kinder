import { SidebarKidList } from "~/features/kid";
import { Card } from "~/shared/ui/card";

export function DashboardDesktopSidebar() {
  return (
    <div className="sticky top-[6rem] z-40">
      <Card className="min-w-[16rem] max-w-[16rem] overflow-hidden bg-white/50">
        <SidebarKidList />
      </Card>
    </div>
  );
}
