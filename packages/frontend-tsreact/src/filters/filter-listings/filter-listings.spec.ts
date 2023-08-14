import { mockListingsData } from "../../mocks";
import { filterListings } from "./filter-listings";

describe("filterListings function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an all listings if no filters are provided", () => {
    const filtered = filterListings(mockListingsData, [], [], [], []);

    expect(filtered).toHaveLength(5);
  });

  it("should filter by price", () => {
    const filtered = filterListings(
      mockListingsData,
      [{ label: "£300,000", key: "300000" }],
      [],
      [],
      [],
    );

    expect(filtered).toHaveLength(2);
  });

  it("should filter by bedrooms", () => {
    const filtered = filterListings(
      mockListingsData,
      [],
      [{ label: "2 Bedroom", key: "2" }],
      [],
      [],
    );

    expect(filtered).toHaveLength(5);
  });

  it("should filter by livingrooms", () => {
    const filtered = filterListings(
      mockListingsData,
      [],
      [],
      [{ label: "2 Living Room", key: "2" }],
      [],
    );

    expect(filtered).toHaveLength(5);
  });

  it("should filter by bathrooms", () => {
    const filtered = filterListings(
      mockListingsData,
      [],
      [],
      [],
      [{ label: "3 Bathroom", key: "3" }],
    );

    expect(filtered).toHaveLength(5);
  });

  it("should filter by multiple criteria", () => {
    const filtered = filterListings(
      mockListingsData,
      [
        { label: "£300,000", key: "300000" },
        { label: "3 Bedrooms", key: "3" },
        { label: "2 Living Rooms", key: "2" },
      ],
      [{ label: "2 Bedroom", key: "2" }],
      [{ label: "2 Living Room", key: "2" }],
      [{ label: "3 Bathroom", key: "3" }],
    );

    expect(filtered).toHaveLength(2);
  });
});
