import { mockListingsData } from "../../mocks";
import { generateListingFilters } from "./generate-listings-filters";

describe("generateListingFilters function", () => {
  it("should generate filter options for price, bedrooms, livingrooms, and bathrooms", () => {
    const result = generateListingFilters(mockListingsData);

    expect(result.priceFilterOptions).toStrictEqual([
      { label: "£300,000", key: "300000" },
      { label: "£350,000", key: "350000" },
    ]);

    expect(result.bedroomFilterOptions).toStrictEqual([{ label: "2 Bedroom", key: "2" }]);

    expect(result.bathroomFilterOptions).toStrictEqual([{ label: "3 Bathroom", key: "3" }]);
    expect(result.livingroomFilterOptions).toStrictEqual([{ label: "2 Living Room", key: "2" }]);
  });
});
