import { act, renderHook } from "@testing-library/react";

import { useSearch } from "./useSearch";

describe("useSearch hook", () => {
  const data = [
    { address: "27 test street avenue, test city, te3 0st", price: "350000" },
    { address: "25 test street avenue, test city, te2 1st", price: "450000" },
    { address: "12 test street avenue, test city, te1 1st", price: "250000" },
    { address: "15 test street avenue, test city, te4 4st", price: "150000" },
  ];

  const keys = ["address", "price"];

  const options = {
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.2,
  };

  it("returns initial search state", () => {
    const { result } = renderHook(() => useSearch(data, keys, options));

    expect(result.current.searchValue).toBe("");
    expect(result.current.searchResults).toStrictEqual([]);
  });

  it("updates search value and search results", () => {
    const { result } = renderHook(() => useSearch(data, keys, options));

    act(() => {
      result.current.setSearchValue("250");
    });

    expect(result.current.searchValue).toBe("250");
    expect(result.current.searchResults).toStrictEqual([
      {
        item: {
          address: "12 test street avenue, test city, te1 1st",
          price: "250000",
        },
        matches: [
          {
            indices: [[0, 2]],
            value: "250000",
            key: "price",
          },
        ],
      },
    ]);

    act(() => {
      result.current.setSearchValue("nonexistent");
    });

    expect(result.current.searchValue).toBe("nonexistent");
    expect(result.current.searchResults).toStrictEqual([]);
  });

  it("updates search value and search results without matches when includeMatches is false", () => {
    const { result } = renderHook(() =>
      useSearch(data, keys, { ...options, includeMatches: false }),
    );

    act(() => {
      result.current.setSearchValue("250");
    });

    expect(result.current.searchValue).toBe("250");
    expect(result.current.searchResults).toStrictEqual([
      {
        item: {
          address: "12 test street avenue, test city, te1 1st",
          price: "250000",
        },
        matches: null,
      },
    ]);
  });
});
