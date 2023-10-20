import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { groupAPI } from "~/features/group";

const routeNames = [
  {
    route: "notes",
    name: "Примечания",
  },
  {
    route: "parents",
    name: "Родители",
  },
  {
    route: "absences",
    name: "Отсутствия",
  },
  {
    route: "vaccinations",
    name: "Прививки",
  },
  {
    route: "kids",
    name: "Дети",
  },
];
export function Breadcrumbs() {
  const router = useRouter();

  const group = groupAPI.useGetOne();

  const routes = router.asPath.split("/").slice(2);
  const groupId = routes[0];
  const entity = routes[1];

  if (!groupId) return null;

  if (!group.data) {
    return (
      <div className="mb-8 mt-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-center gap-1 md:mt-2">
      {!entity && <h1 className="text-slate-500">{group.data?.title}</h1>}
      {entity && (
        <>
          <Link
            href={`/dashboard/${groupId}`}
            className=" text-slate-500 hover:text-slate-600"
          >
            {group.data?.title}
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-500" />
          <span className="text-slate-900">
            {routeNames.find((r) => r.route === entity)?.name}
          </span>
        </>
      )}
    </div>
  );
}
