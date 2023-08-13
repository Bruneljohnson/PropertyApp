import { type PropertyListingType } from "../../../types";

export type ListingDetailTemplateProps = {
  loading: boolean;
  error: boolean;
  data: PropertyListingType | null;
};
