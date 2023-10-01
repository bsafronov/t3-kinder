import { Baby, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";
import { cn } from "~/shared/utils/cn";

export function SidebarKidList() {
  const groupId = useRouter().query.groupId as string;
  const kidId = useRouter().query.kidId as string;
  const {
    data: kids,
    isLoading,
    isSuccess,
  } = api.kids.getAll.useQuery(
    { groupId: groupId },
    {
      enabled: !!groupId && !Array.isArray(groupId),
    },
  );

  return (
    <div>
      <div className="flex items-center justify-between border-b px-4 py-1">
        <h5 className="font-semibold">Мои дети</h5>
        <Link
          href={`/dashboard/${groupId}/create-kid`}
          className="text-blue-500 transition-transform hover:rotate-90 hover:text-blue-600"
        >
          <Plus className="h-4 w-4" />
        </Link>
      </div>
      {isLoading && (
        <div className="flex justify-center py-1">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {isSuccess && kids.length === 0 && (
        <div className="px-4 py-1">Детей нет</div>
      )}
      {isSuccess && kids.length > 0 && (
        <div>
          <ul className="divide-y">
            {kids.map((kid) => (
              <li key={kid.id}>
                <Link href={`/dashboard/${groupId}/kids/${kid.id}`}>
                  <div
                    className={cn(
                      "flex items-center gap-1 px-4 py-1 hover:bg-slate-100",
                      {
                        "text-blue-600": kid.id === kidId,
                      },
                    )}
                  >
                    <Baby className="h-4 w-4" />
                    <span>{`${kid.lastName} ${kid.firstName[0]}. ${kid.middleName[0]}.`}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
