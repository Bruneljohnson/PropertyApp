import { mockListingsData } from "../../mocks";
import { generateListingFilters } from "./generate-listings-filters";

describe("generateBioFilters function", () => {
  it("should generate filter options for job titles, squads, levels, and tools", () => {
    const result = generateListingFilters(mockListingsData);

    expect(result.priceFilterOptions).toStrictEqual([
      { label: "Software Engineer", key: "software-engineer" },
      { label: "QA Engineer", key: "qa-engineer" },
      { label: "Product Manager", key: "product-manager" },
    ]);

    expect(result.bedroomFilterOptions).toStrictEqual([
      { label: "Software Engineer", key: "software-engineer" },
      { label: "QA Engineer", key: "qa-engineer" },
      { label: "Product Manager", key: "product-manager" },
    ]);
    expect(result.bathroomFilterOptions).toStrictEqual([
      { label: "Software Engineer", key: "software-engineer" },
      { label: "QA Engineer", key: "qa-engineer" },
      { label: "Product Manager", key: "product-manager" },
    ]);
    expect(result.livingroomFilterOptions).toStrictEqual([
      { label: "Software Engineer", key: "software-engineer" },
      { label: "QA Engineer", key: "qa-engineer" },
      { label: "Product Manager", key: "product-manager" },
    ]);
  });
});
