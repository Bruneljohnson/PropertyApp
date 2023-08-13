import { type ListingFilterOptionType } from "../../../types";

export type ListingFilterChipsProps = {
  error?: boolean;
  items: ListingFilterOptionType[];
  loading?: boolean;
  selection: string[];
  setSelection: (selection: ListingFilterOptionType) => void;
  size?: "small" | "medium";
};
