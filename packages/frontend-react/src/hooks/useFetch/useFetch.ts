/* eslint-disable etc/no-misused-generics */
// disabling as this is potentially a false positive
import { useEffect, useState } from "react";

export const useFetch = <T>(
  url: string,
): {
  res: T | null;
  error: Error | null;
  loading: boolean;
} => {
  const [res, setRes] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data: T = await response.json();
        setRes(data);
      } catch (error: unknown) {
        setError(error instanceof Error ? error : new Error(String(error)));
      }
    })();
  }, [url]);

  return { res, error, loading: !res };
};
