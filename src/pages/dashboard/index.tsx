import { GroupList } from "~/features/group";
import { Card } from "~/shared/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <GroupList />
      <div>
        <h5 className="text-3xl font-semibold">Мои приглашения</h5>
        <Card className="p-4">
          <div className="mb-2">У вас пока нет приглашений</div>
          <div className="flex justify-end"></div>
        </Card>
      </div>
    </div>
  );
}
