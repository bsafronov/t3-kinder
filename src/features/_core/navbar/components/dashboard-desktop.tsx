import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "~/shared/ui/button";

export function DashboardDesktopNavbar() {
  const router = useRouter();
  const isProfilePage = router.pathname === "/dashboard";
  const isGroupMainPage = router.pathname === "/dashboard/[groupId]";
  const groupPageId = (router.query.groupId as string) || undefined;

  return (
    <div className="sticky top-0 z-40 mx-auto mt-0 border-b bg-white px-4">
      <div className="mx-auto max-w-screen-xl p-4 backdrop-blur-sm">
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex w-[16rem] items-center">
              <Image alt="logo" src={"/logo.svg"} width={150} height={130} />
            </div>
            <div className="flex gap-2">
              {groupPageId && (
                <Link href={`/dashboard/${groupPageId}`}>
                  <Button variant={"ghost"} disabled={isGroupMainPage}>
                    Главная
                  </Button>
                </Link>
              )}
              {!isProfilePage && (
                <Link href={"/dashboard"}>
                  <Button variant={"ghost"}>Моя страница</Button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={"/"}>
              <Button variant={"ghost"}>Интро</Button>
            </Link>

            <button onClick={() => void signOut({ callbackUrl: "/" })}>
              <LogOut className="h-6 w-6 text-red-500 hover:text-red-400" />
              <span className="sr-only">Выйти</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
