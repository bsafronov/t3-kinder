import { Card } from "~/shared/ui/card";
import { groupAPI } from "..";
import { Skeleton } from "~/shared/ui/skeleton";

export function GroupInfo() {
  const { data: group, isLoading } = groupAPI.useGetOne();

  return (
    <div>
      {!isLoading && (
        <h1 className="mb-8 text-4xl font-bold">{group?.title}</h1>
      )}
      {isLoading && <Skeleton className="mb-8 h-10 w-64 bg-white" />}
      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Люди</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!isLoading && (
            <>
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
            </>
          )}
          {isLoading && (
            <>
              <Skeleton className="h-[5.5rem] bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
            </>
          )}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">
          Информация по детям
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!isLoading && (
            <>
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
                <span className="text-slate-500">
                  {group?._count.vaccinations}
                </span>
              </Card>
            </>
          )}
          {isLoading && (
            <>
              <Skeleton className="h-[5.5rem] w-full bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
            </>
          )}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Теги</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!isLoading && (
            <>
              <Card className="p-4">
                <h5 className="mb-2 font-semibold">Примечания</h5>
                <span className="text-slate-500">{group?._count.noteTags}</span>
              </Card>
              <Card className="p-4">
                <h5 className="mb-2 font-semibold">Отсутствия</h5>
                <span className="text-slate-500">
                  {group?._count.absenceTags}
                </span>
              </Card>
              <Card className="p-4">
                <h5 className="mb-2 font-semibold">Прививки</h5>
                <span className="text-slate-500">
                  {group?._count.vaccinationTags}
                </span>
              </Card>
            </>
          )}
          {isLoading && (
            <>
              <Skeleton className="h-[5.5rem] bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
              <Skeleton className="h-[5.5rem] bg-white" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
