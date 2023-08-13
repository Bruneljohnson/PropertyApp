import { sortBy } from "lodash";
import { createContext, useEffect, useMemo, useState } from "react";

import { filterListings, generateListingFilters } from "../../filters";
import {
  type ListingFilterOptionType,
  type ListingFiltersContextType,
  type ListingFiltersProviderProps,
  type ListingFilterType,
  type PropertyListingType,
} from "../../types";

export const ListingFiltersContext = createContext<ListingFiltersContextType>({
  listingsData: [],
  setListingsData: () => null,
  filteredListings: [],
  filters: [],
});

export const ListingFiltersProvider = ({ children }: ListingFiltersProviderProps): JSX.Element => {
  const [listingsData, setListingsData] = useState<PropertyListingType[] | null>([]);
  const [filteredListings, setFilteredListings] = useState<PropertyListingType[]>([]);

  const [prices, setPrices] = useState<ListingFilterOptionType[]>([]);
  const [bedrooms, setBedrooms] = useState<ListingFilterOptionType[]>([]);
  const [bathrooms, setBathrooms] = useState<ListingFilterOptionType[]>([]);
  const [livingrooms, setLivingrooms] = useState<ListingFilterOptionType[]>([]);

  const [filters, setFilters] = useState<ListingFilterType[]>([]);

  useEffect(() => {
    if (!listingsData) {
      return;
    }

    const {
      priceFilterOptions,
      bedroomFilterOptions,
      livingroomFilterOptions,
      bathroomFilterOptions,
    } = generateListingFilters(listingsData);

    setFilters([
      {
        options: sortBy(priceFilterOptions, ["key"]),
        selection: prices,
        setSelection: setPrices,
        resetSelection: () => {
          setPrices([]);
        },
        title: "Price",
      },
      {
        options: sortBy(bedroomFilterOptions, ["key"]),
        selection: bedrooms,
        setSelection: setBedrooms,
        resetSelection: () => {
          setBedrooms([]);
        },
        title: "Bedrooms",
      },
      {
        options: sortBy(livingroomFilterOptions, ["key"]),
        selection: livingrooms,
        setSelection: setLivingrooms,
        resetSelection: () => {
          setLivingrooms([]);
        },
        title: "Living rooms",
      },
      {
        options: sortBy(bathroomFilterOptions, ["key"]),
        selection: bathrooms,
        setSelection: setBathrooms,
        resetSelection: () => {
          setBathrooms([]);
        },
        title: "Bathrooms",
      },
    ]);

    setFilteredListings(filterListings(listingsData, prices, bedrooms, livingrooms, bathrooms));
  }, [listingsData, prices, bedrooms, bathrooms, livingrooms]);

  const value = useMemo(
    () => ({
      listingsData,
      filteredListings,
      filters,
      setListingsData,
    }),
    [listingsData, filteredListings, filters, setListingsData],
  );

  return <ListingFiltersContext.Provider value={value}>{children}</ListingFiltersContext.Provider>;
};
