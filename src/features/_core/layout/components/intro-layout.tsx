import Head from "next/head";
import { IntroNavbar } from "../../navbar";
import { IntroSidebar } from "../../sidebar";

export function IntroLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Мои дети</title>
        <meta name="description" content="Создано с любовью для воспитателей" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IntroNavbar />
      <div className="container mt-4 flex gap-4">
        <IntroSidebar />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
