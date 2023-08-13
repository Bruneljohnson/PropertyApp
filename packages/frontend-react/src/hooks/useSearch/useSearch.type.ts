import type Fuse from "fuse.js";

export type UseSearchReturnType<T> = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchResults: {
    item: T;
    matches: readonly Fuse.FuseResultMatch[] | null;
  }[];
};
