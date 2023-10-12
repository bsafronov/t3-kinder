import { Baby, Home, LayoutGrid, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { cn } from "~/shared/utils/cn";
import { ModalEnum } from "../../modal";

export function DashboardMobileNavbar() {
  const groupId = useRouter().query.groupId as string;
  const { pushQuery } = useQueryString();

  const isMainPage = useRouter().pathname === `/dashboard/[groupId]`;
  const isKidsPage = useRouter().pathname === `/dashboard/[groupId]/kids`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-slate-300 bg-white/50 py-2 backdrop-blur-sm">
      <Link
        href={`/dashboard/${groupId}`}
        className={cn(
          "flex flex-col items-center justify-center text-slate-500",
          {
            "text-blue-500": isMainPage,
          },
        )}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs">Главная</span>
      </Link>
      <button
        onClick={() => pushQuery({ modal: ModalEnum.KIDS_LIST })}
        className={cn(
          "flex flex-col items-center justify-center text-slate-500",
          {
            "text-blue-500": isKidsPage,
          },
        )}
      >
        <Baby className="h-6 w-6" />
        <span className="text-xs">Дети</span>
      </button>
      <button
        className="text-emerald-500"
        onClick={() => pushQuery({ modal: ModalEnum.ENTITY_CREATE })}
      >
        <PlusCircle className="h-10 w-10" />
      </button>
      <button className="flex flex-col items-center justify-center text-slate-500">
        <LayoutGrid className="h-6 w-6" />
        <span className="text-xs">Меню</span>
      </button>

      <Link
        className="flex flex-col items-center justify-center text-slate-500"
        href={"/dashboard"}
      >
        <User2 className="h-6 w-6" />
        <span className="text-xs">Профиль</span>
      </Link>
    </div>
  );
}
