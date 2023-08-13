import Fuse from "fuse.js";
import { useMemo, useState } from "react";

import { type UseSearchReturnType } from "./useSearch.type";

export const useSearch = <T,>(
  data: T[],
  keys: string[],
  options?: Fuse.IFuseOptions<T>,
): UseSearchReturnType<T> => {
  const [searchValue, setSearchValue] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys,
        ...(options ?? {
          includeMatches: true,
          minMatchCharLength: 2,
          shouldSort: true,
          threshold: 0.2,
        }),
      }),
    [data, keys, options],
  );

  const searchResults = useMemo(() => {
    if (!searchValue) {
      return [];
    }

    return fuse
      .search(searchValue)
      .map(({ item, matches }) => ({ item, matches: matches ?? null }));
  }, [fuse, searchValue]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
  };
};
