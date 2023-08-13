import { kebabCase } from "lodash";

import { type ListingFilterOptionType, type PropertyListingType } from "../../types";

export const filterListings = (
  propertyListingsList: PropertyListingType[],
  prices: ListingFilterOptionType[],
  bedrooms: ListingFilterOptionType[],
  livingrooms: ListingFilterOptionType[],
  bathrooms: ListingFilterOptionType[],
): PropertyListingType[] => {
  const filterByPrice = item =>
    prices.length === 0 || prices.map(price => price.key).includes(kebabCase(item.price));

  const filterByBedrooms = item =>
    bedrooms.length === 0 ||
    bedrooms.map(bedroom => bedroom.key).includes(kebabCase(item.bedrooms));
  const filterByLivingrooms = item =>
    livingrooms.length === 0 ||
    livingrooms.map(livingroom => livingroom.key).includes(kebabCase(item.livingrooms));
  const filterByBathrooms = item =>
    bathrooms.length === 0 ||
    bathrooms.map(bathroom => bathroom.key).includes(kebabCase(item.bathrooms));

  return propertyListingsList.filter(
    item =>
      filterByPrice(item) &&
      filterByBedrooms(item) &&
      filterByLivingrooms(item) &&
      filterByBathrooms(item),
  );
};
