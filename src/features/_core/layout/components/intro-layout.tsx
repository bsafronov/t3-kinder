import Head from "next/head";

export function IntroLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Мои дети</title>
        <meta name="description" content="Создано с любовью для воспитателей" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gradient-to-b from-slate-200 to-fuchsia-200">
        <main className="mx-auto min-h-screen max-w-screen-xl px-4 pb-8">
          {children}
        </main>
      </div>
    </>
  );
}
