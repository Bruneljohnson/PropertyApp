import { type ReactNode, type SetStateAction } from "react";

export type PropertyListingType = {
  id: string;
  address: string;
  summary: string;
  bedrooms: string;
  livingrooms: string;
  bathrooms: string;
  price: string;
  imageName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ListingFilterOptionType = {
  key: string;
  label: string;
};

export type ListingFilterSetSelectionType = (
  selection: SetStateAction<ListingFilterOptionType[]>,
) => void;

export type ListingFilterType = {
  options: ListingFilterOptionType[];
  selection: ListingFilterOptionType[];
  setSelection: ListingFilterSetSelectionType;
  resetSelection: () => void;
  title: string;
};

export type ResponseType<T> = {
  success: string;
  length: number;
  data: T;
};

export type ListingFiltersProviderProps = {
  children: ReactNode;
};

export type ListingFiltersContextType = {
  listingsData: PropertyListingType[] | null;
  filteredListings: PropertyListingType[];
  filters: ListingFilterType[];
  setListingsData: (listingsData: SetStateAction<PropertyListingType[] | null>) => void;
};
