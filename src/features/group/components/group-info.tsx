import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { Card } from "~/shared/ui/card";
import { api } from "~/shared/utils/api";

export function GroupInfo() {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  const {
    data: group,
    isLoading,
    isSuccess,
  } = api.groups.getById.useQuery(
    { groupId: groupId ?? "" },
    {
      enabled: !!groupId,
    },
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isSuccess) {
    return <div>Группа не найдена</div>;
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">{group?.title}</h1>
      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Люди</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Дети</h5>
            <span className="text-slate-500">{group?._count.kids}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Пользователи</h5>
            <span className="text-slate-500">{group?._count.users}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Администраторы</h5>
            <span className="text-slate-500">{group?._count.admins}</span>
          </Card>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">
          Информация по детям
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Родители</h5>
            <span className="text-slate-500">{group?._count.parents}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Примечания</h5>
            <span className="text-slate-500">{group?._count.notes}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Отсутствия</h5>
            <span className="text-slate-500">{group?._count.absences}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Прививки</h5>
            <span className="text-slate-500">{group?._count.vaccinations}</span>
          </Card>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Теги</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Примечания</h5>
            <span className="text-slate-500">{group?._count.noteTags}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Отсутствия</h5>
            <span className="text-slate-500">{group?._count.absenceTags}</span>
          </Card>
          <Card className="p-4">
            <h5 className="mb-2 font-semibold">Прививки</h5>
            <span className="text-slate-500">
              {group?._count.vaccinationTags}
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
