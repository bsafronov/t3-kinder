import { Loader2, Users2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { api } from "~/shared/utils/api";

export function GroupList() {
  const user = useSession().data?.user;

  const {
    data: groups,
    isSuccess,
    isLoading,
  } = api.groups.getAll.useQuery(
    { userId: user?.id ?? "" },
    {
      enabled: !!user,
    },
  );

  return (
    <div>
      <h5 className="mb-2 text-3xl font-semibold">Мои группы</h5>

      <Card className="p-4">
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          </div>
        )}
        {isSuccess && groups.length === 0 && (
          <div className="mb-2">У вас пока нет групп</div>
        )}
        {isSuccess && groups.length > 0 && (
          <ul className="mb-4 space-y-2">
            {groups.map((group) => (
              <li key={group.id}>
                <Link href={`/dashboard/${group.id}`} className="">
                  <div className="flex items-center gap-2 rounded-md border px-2 py-1 hover:bg-slate-50">
                    <Users2 />
                    {group.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isSuccess && (
          <div className="flex justify-end">
            <Link href={"/dashboard/create-group"}>
              <Button>Создать</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
