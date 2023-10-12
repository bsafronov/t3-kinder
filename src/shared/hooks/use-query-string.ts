import { useRouter } from "next/router";
import queryString from "query-string";

type Props = queryString.ParsedQuery<string>;

export function useQueryString() {
  const router = useRouter();

  const pushQuery = (query: Props) => {
    const parsed = queryString.parseUrl(location.href);

    const newUrl = queryString.stringifyUrl({
      url: parsed.url,
      query,
    });
    void router.push(newUrl, undefined, { scroll: false });
  };

  return {
    pushQuery,
  };
}
