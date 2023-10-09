import { Card } from "~/shared/ui/card";
import { groupAPI } from "..";
import { Skeleton } from "~/shared/ui/skeleton";
import Link from "next/link";

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
                <h5 className="mb-2 font-semibold">Пользователи</h5>
                <span className="text-slate-500">{group?.userIDs.length}</span>
              </Card>
              <Card className="p-4">
                <h5 className="mb-2 font-semibold">Администраторы</h5>
                <span className="text-slate-500">{group?.adminIDs.length}</span>
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
              <Link href={`/dashboard/${group?.id}/parents`}>
                <Card className="p-4">
                  <h5 className="mb-2 font-semibold">Родители</h5>
                  <span className="text-slate-500">
                    {group?._count.parents}
                  </span>
                </Card>
              </Link>
              <Link href={`/dashboard/${group?.id}/notes`}>
                <Card className="p-4">
                  <h5 className="mb-2 font-semibold">Примечания</h5>
                  <span className="text-slate-500">{group?._count.notes}</span>
                </Card>
              </Link>
              <Link href={`/dashboard/${group?.id}/absences`}>
                <Card className="p-4">
                  <h5 className="mb-2 font-semibold">Отсутствия</h5>
                  <span className="text-slate-500">
                    {group?._count.absences}
                  </span>
                </Card>
              </Link>
              <Link href={`/dashboard/${group?.id}/vaccinations`}>
                <Card className="p-4">
                  <h5 className="mb-2 font-semibold">Прививки</h5>
                  <span className="text-slate-500">
                    {group?._count.vaccinations}
                  </span>
                </Card>
              </Link>
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
