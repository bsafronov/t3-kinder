import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "~/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/shared/ui/card";

export default function Home() {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-8 max-w-xl text-center text-4xl font-bold text-slate-800 sm:mt-20 sm:text-6xl md:max-w-3xl md:text-7xl">
        Все дети под рукой вместе с{" "}
        <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Kinder
        </span>
      </h1>
      <div className="mt-8 flex gap-4">
        {sessionData?.user && (
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href={"/dashboard"}
          >
            Моя доска
          </Link>
        )}

        <Button
          size={"lg"}
          variant={sessionData ? "destructive" : "default"}
          onClick={
            sessionData
              ? () => void signOut({ callbackUrl: "/" })
              : () => void signIn(undefined, { callbackUrl: "/dashboard" })
          }
          disabled={sessionData === undefined}
        >
          {sessionData === undefined && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {sessionData ? "Выйти" : "Войти"}
        </Button>
      </div>
      <div className="mt-16 sm:mt-24">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-slate-800">Группы</CardTitle>
              <CardDescription>
                Работаете в нескольких группах? Держите под рукой их все!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-slate-800">Воспитатели</CardTitle>
              <CardDescription>
                Пригласите коллег для совместного ведения группы... или пусть
                только смотрят!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-slate-800">Удобство</CardTitle>
              <CardDescription>
                Смотрите всю информацию по отдельному ребёнку или получите
                список записей по всей группе!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2 md:col-start-2">
            <CardHeader>
              <CardTitle className="text-slate-800">Журнал</CardTitle>
              <CardDescription>
                Следите за изменениями внутри группы. Ничто не останется
                незамеченным!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2 sm:col-start-2 md:col-start-auto">
            <CardHeader>
              <CardTitle className="text-slate-800">Теги</CardTitle>
              <CardDescription>
                Создайте теги для удобства поиска и сортировки записей.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
