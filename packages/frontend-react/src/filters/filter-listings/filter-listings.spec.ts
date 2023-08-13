import { mockListingsData } from "../../mocks";
import { filterListings } from "./filter-listings";

describe("filterListings function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an all listings if no filters are provided", () => {
    const filtered = filterListings(mockListingsData, [], [], [], []);

    expect(filtered).toHaveLength(3);
  });

  it("should filter by price", () => {
    const filtered = filterListings(mockListingsData, [{ label: "Price", key: "250" }], [], [], []);

    expect(filtered).toStrictEqual([mockListingsData[0]]);
  });

  it("should filter by bedrooms", () => {
    const filtered = filterListings(
      mockListingsData,
      [],
      [{ label: "5 Bedrooms", key: "5" }],
      [],
      [],
    );

    expect(filtered).toStrictEqual([mockListingsData[0]]);
  });

  it("should filter by livingrooms", () => {
    const filtered = filterListings(
      mockListingsData,
      [],
      [],
      [{ label: "5 Living Rooms", key: "5" }],
      [],
    );

    expect(filtered).toStrictEqual([mockListingsData[0]]);
  });

  it("should filter by bathrooms", () => {
    const filtered = filterListings(
      mockListingsData,
      [],
      [],
      [],
      [{ label: "5 Bathrooms", key: "5" }],
    );

    expect(filtered).toStrictEqual([mockListingsData[0]]);
  });

  it("should filter by multiple criteria", () => {
    const filtered = filterListings(
      mockListingsData,
      [{ label: "Price", key: "250" }],
      [{ label: "5 Bedrooms", key: "5" }],
      [{ label: "5 Living Rooms", key: "5" }],
      [{ label: "5 Bathrooms", key: "5" }],
    );

    expect(filtered).toStrictEqual([mockListingsData[0]]);
  });
});
