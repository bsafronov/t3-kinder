import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function DashboardNavbar() {
  const router = useRouter();
  const isProfilePage = router.pathname === "/dashboard";
  const isGroupMainPage = router.pathname === "/dashboard/[groupId]";
  const groupPageId = (router.query.groupId as string) || undefined;

  return (
    <div className="container sticky top-0 z-40 mt-4">
      <Card className="p-4">
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex w-[15rem] items-center">
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

            <Button
              variant={"outline"}
              onClick={() => void signOut({ callbackUrl: "/" })}
            >
              Выйти
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
