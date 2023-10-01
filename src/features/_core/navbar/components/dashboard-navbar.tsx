import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function DashboardNavbar() {
  return (
    <div className="container sticky top-0 mt-4">
      <Card className="p-4">
        <div className="flex justify-between">
          <Image alt="logo" src={"/logo.svg"} width={150} height={130} />
          <div className="flex gap-2">
            <Link href={"/"}>
              <Button variant={"ghost"}>Главная</Button>
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
