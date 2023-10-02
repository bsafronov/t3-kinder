import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function IntroNavbar() {
  const { data: sessionData } = useSession();

  return (
    <div className="container sticky top-0 z-40 mt-4">
      <Card className="p-4">
        <div className="flex justify-between">
          <Image alt="logo" src={"/logo.svg"} width={150} height={130} />
          <div className="flex gap-2">
            {sessionData && (
              <Link href={"/dashboard"}>
                <Button variant={"ghost"}>Дашборд</Button>
              </Link>
            )}
            <Button
              variant={"outline"}
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Выйти" : "Войти"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
