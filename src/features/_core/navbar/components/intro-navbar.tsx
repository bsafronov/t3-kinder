import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function IntroNavbar() {
  const { data: sessionData } = useSession();

  return (
    <div className="sticky top-0 z-40 mx-auto max-w-screen-xl px-4">
      <Card className="rounded-t-none border p-4">
        <div className="flex justify-between">
          <Image alt="logo" src={"/logo.svg"} width={150} height={130} />
          <div className="flex gap-2">
            {sessionData && (
              <Link href={"/dashboard"}>
                <Button variant={"ghost"}>Дашборд</Button>
              </Link>
            )}
            <button
              className="flex items-center gap-2"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? (
                <LogOut className="h-6 w-6 text-red-500 hover:text-red-400" />
              ) : (
                <LogIn className="h-6 w-6 text-blue-500 hover:text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
