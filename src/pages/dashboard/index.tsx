import { Card } from "~/shared/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <div>
        <h5 className="text-3xl font-semibold">Мои группы</h5>
        <Card className="p-4">У вас пока нет групп</Card>
      </div>
    </div>
  );
}
