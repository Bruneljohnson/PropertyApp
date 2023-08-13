import { type ListingFilterOptionType, type ListingFilterType } from "../../../types";

export type ListingFiltersProps = {
  loading: boolean;
  error: boolean;
};

export type ListingFilterProps = {
  error: boolean;
  handleAccordionClick: (num: number) => void;
  handleFilterSelect: (selection: ListingFilterOptionType) => void;
  i: number;
  loading: boolean;
  openIndexes: number[];
} & ListingFilterType;
