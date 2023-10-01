import { SidebarKidList } from "~/features/kid";
import { Card } from "~/shared/ui/card";

export function DashboardSidebar() {
  return (
    <div className="sticky top-16">
      <Card className="min-w-[16rem] max-w-[16rem]">
        <SidebarKidList />
      </Card>
    </div>
  );
}
