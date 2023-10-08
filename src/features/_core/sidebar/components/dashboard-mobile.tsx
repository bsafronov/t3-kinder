import { Baby, Home, LayoutGrid, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export function DashboardMobileSidebar() {
  const groupId = useRouter().query.groupId as string;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-4 border-t bg-white p-4">
      <Link
        href={`/dashboard/${groupId}`}
        className="flex items-center justify-center text-slate-500"
      >
        <Home className="h-8 w-8" />
      </Link>
      <Link
        href={`/dashboard/${groupId}/kids`}
        className="flex items-center justify-center text-slate-500"
      >
        <Baby className="h-8 w-8" />
      </Link>
      <button className="text-blue-500">
        <PlusCircle className="h-10 w-10" />
      </button>
      <button className="flex items-center justify-center text-slate-500">
        <LayoutGrid className="h-8 w-8" />
      </button>

      <button className="flex items-center justify-center text-slate-500">
        <User2 className="h-8 w-8" />
      </button>
    </div>
  );
}
