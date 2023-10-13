import { Card } from "~/shared/ui/card";
import { groupAPI } from "..";
import { Skeleton } from "~/shared/ui/skeleton";
import Link from "next/link";
import {
  ClipboardList,
  NavigationOff,
  Settings,
  Syringe,
  Tag,
  UserCheck2,
  Users2,
} from "lucide-react";

export function GroupInfo() {
  const { data: group, isLoading } = groupAPI.useGetOne();

  return (
    <div>
      {!isLoading && (
        <div className="mb-8 flex items-center justify-between">
          <h1 className=" text-4xl font-bold">{group?.title}</h1>
          <Link
            href={`/dashboard/${group?.id}/settings`}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-500"
          >
            <Settings />
            Настройки
          </Link>
        </div>
      )}
      {isLoading && <Skeleton className="mb-8 h-10 w-64 bg-white" />}

      <div className="mb-8">
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">
          Информация по детям
        </h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {!isLoading && (
            <>
              <Link href={`/dashboard/${group?.id}/parents`}>
                <Card className="p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <h5 className="mb-2 flex items-center gap-2 font-semibold">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200">
                      <Users2 className="h-5 w-5 text-amber-600" />
                    </div>
                    Родители
                  </h5>
                  <span className="text-slate-500">
                    {group?._count.parents}
                  </span>
                </Card>
              </Link>
              <Link href={`/dashboard/${group?.id}/notes`}>
                <Card className="flex divide-x overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="grow p-4">
                    <h5 className="mb-2 flex items-center gap-2 font-semibold">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-200">
                        <ClipboardList className="h-5 w-5 text-fuchsia-600" />
                      </div>
                      Примечания
                    </h5>
                    <span className="text-slate-500">
                      {group?._count.notes}
                    </span>
                  </div>
                  <div className="bg-fuchsia-50 p-4">
                    <h5 className="mb-2 flex items-center gap-2 font-semibold ">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-200">
                        <Tag className="h-5 w-5 text-fuchsia-600" />
                      </div>
                      Теги
                    </h5>
                    <span className="text-slate-500">
                      {group?._count.noteTags}
                    </span>
                  </div>
                </Card>
              </Link>
              <Link href={`/dashboard/${group?.id}/absences`}>
                <Card className="flex divide-x overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="grow  p-4">
                    <h5 className="mb-2 flex items-center gap-2 font-semibold">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200">
                        <NavigationOff className="h-5 w-5 text-rose-600" />
                      </div>
                      Отсутствия
                    </h5>
                    <span className="text-slate-500">
                      {group?._count.absences}
                    </span>
                  </div>
                  <div className="bg-rose-50 p-4">
                    <h5 className="mb-2 flex items-center gap-2 font-semibold ">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200">
                        <Tag className="h-5 w-5 text-rose-600" />
                      </div>
                      Теги
                    </h5>
                    <span className="text-slate-500">
                      {group?._count.noteTags}
                    </span>
                  </div>
                </Card>
              </Link>
              <Link href={`/dashboard/${group?.id}/vaccinations`}>
                <Card className="flex divide-x overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="grow p-4">
                    <h5 className="mb-2 flex items-center gap-2  font-semibold">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200">
                        <Syringe className="h-5 w-5 text-emerald-600" />
                      </div>
                      Прививки
                    </h5>
                    <span className="text-slate-500">
                      {group?._count.vaccinations}
                    </span>
                  </div>
                  <div className="bg-emerald-50 p-4">
                    <h5 className="mb-2 flex items-center gap-2 font-semibold">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200">
                        <Tag className="h-5 w-5 text-emerald-600" />
                      </div>
                      Теги
                    </h5>
                    <span className="text-slate-500">
                      {group?._count.vaccinationTags}
                    </span>
                  </div>
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
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Группа</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {!isLoading && (
            <>
              <Card className="bg-indigo-200/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <h5 className="mb-2 flex items-center gap-2 font-semibold text-indigo-600">
                  <UserCheck2 />
                  Пользователи
                </h5>
                <span className="text-slate-500">{group?.userIDs.length}</span>
              </Card>
              <Card className="bg-indigo-200/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <h5 className="mb-2 flex items-center gap-2 font-semibold text-indigo-600">
                  <UserCheck2 /> Администраторы
                </h5>
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
    </div>
  );
}
