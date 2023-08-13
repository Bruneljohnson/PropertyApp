import { type ReturnType } from "./get-chars-between-indices.type";

export const getCharsBetweenIndices = (
  str: string,
  indices: number[] | [number, number],
): ReturnType => {
  const start = indices[0];
  const end = indices[1];

  const before = str.slice(0, start);
  const after = str.slice(end + 1);
  const result = str.slice(start, end + 1);

  return { result, before, after };
};
