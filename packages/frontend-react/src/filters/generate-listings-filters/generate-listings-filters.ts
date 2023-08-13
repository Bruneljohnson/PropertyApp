import { kebabCase } from "lodash";
import { type ListingFilterOptionType, type PropertyListingType } from "types";

import { type GenerateListingFiltersType } from "./generate-listings-filters.type";

export const generateListingFilters = (data: PropertyListingType[]): GenerateListingFiltersType => {
  const pricesSet = new Set<string>();
  const bedroomsSet = new Set<string>();
  const livingroomsSet = new Set<string>();
  const bathroomsSet = new Set<string>();

  data.forEach(item => {
    pricesSet.add(item.price);
    bedroomsSet.add(item.bedrooms);
    livingroomsSet.add(item.livingrooms);
    bathroomsSet.add(item.bathrooms);
  });

  const priceFilterOptions: ListingFilterOptionType[] = Array.from(pricesSet).map(price => ({
    label: `£${price}`,
    key: kebabCase(price),
  }));
  const bedroomFilterOptions: ListingFilterOptionType[] = Array.from(bedroomsSet).map(bedroom => ({
    label: `${bedroom} Bedroom`,
    key: kebabCase(bedroom),
  }));
  const livingroomFilterOptions: ListingFilterOptionType[] = Array.from(livingroomsSet).map(
    livingroom => ({
      label: `${livingroom} Living Room`,
      key: kebabCase(livingroom),
    }),
  );
  const bathroomFilterOptions: ListingFilterOptionType[] = Array.from(bathroomsSet).map(
    bathroom => ({
      label: `${bathroom} Bathroom`,
      key: kebabCase(bathroom),
    }),
  );

  return {
    priceFilterOptions,
    bedroomFilterOptions,
    bathroomFilterOptions,
    livingroomFilterOptions,
  };
};
