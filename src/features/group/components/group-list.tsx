import Link from "next/link";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function GroupList() {
  return (
    <div>
      <h5 className="text-3xl font-semibold">Мои группы</h5>
      <Card className="p-4">
        <div className="mb-2">У вас пока нет групп</div>
        <div className="flex justify-end">
          <Link href={"/dashboard/create-group"}>
            <Button>Создать</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
