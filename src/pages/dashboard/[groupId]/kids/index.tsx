import { Baby, Loader2 } from "lucide-react";
import Link from "next/link";
import { kidAPI } from "~/features/kid";
import { Heading } from "~/shared/ui/title";

export default function KidsPage() {
  const { data: kids, isLoading, isSuccess } = kidAPI.useGetManyByGroup();

  if (isLoading) {
    return <Loader2 className="h-12 w-12 animate-spin text-blue-500" />;
  }

  return (
    <div>
      <Heading title="Мои дети" />
      {isSuccess && kids.length === 0 && (
        <div className="px-4 py-1 text-slate-500">Список детей пуст</div>
      )}
      {isSuccess && kids.length > 0 && (
        <ul className="flex flex-col gap-2">
          {kids.map((kid) => (
            <li key={kid.id}>
              <Link
                href={`/dashboard/${kid.groupId}/kids/${kid.id}`}
                className="flex items-center gap-2 rounded-md px-4 py-1 hover:bg-white"
              >
                <Baby className="h-8 w-8" />
                {`${kid.lastName} ${kid.firstName[0]}. ${kid.middleName[0]}.`}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
