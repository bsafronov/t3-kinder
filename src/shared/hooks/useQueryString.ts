import { useRouter } from "next/router";
import queryString from "query-string";

type Props = Record<string, string | string[] | boolean> | null | undefined;

export function useQueryString() {
  const router = useRouter();

  const pushQuery = (query: Props) => {
    const parsed = queryString.parseUrl(location.href);
    console.log({ ...parsed.query, ...query });

    const newUrl = queryString.stringifyUrl(
      {
        url: parsed.url,
        query: query ?? undefined,
      },
      { arrayFormat: "comma" },
    );
    void router.push(newUrl, undefined, { scroll: false });
  };

  return {
    pushQuery,
  };
}
