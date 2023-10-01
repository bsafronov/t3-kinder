import Head from "next/head";
import { GroupList } from "~/features/group";
import { Card } from "~/shared/ui/card";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Мои дети. Моя страница</title>
        <meta name="description" content="Создано с любовью для воспитателей" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GroupList />
        <div>
          <h5 className="mb-2 text-3xl font-semibold">Мои приглашения</h5>
          <Card className="p-4">
            <div className="mb-2">У вас пока нет приглашений</div>
            <div className="flex justify-end"></div>
          </Card>
        </div>
      </div>
    </>
  );
}
