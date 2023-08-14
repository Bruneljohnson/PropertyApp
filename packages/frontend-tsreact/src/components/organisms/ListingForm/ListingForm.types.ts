import { type AnyObject, type ObjectSchema } from "yup";

import { type PropertyListingType } from "../../../types";

export type ListingFormProps = {
  title: string;
};
export type ListingFormResponse = {
  response: { data: { data: PropertyListingType } };
};

export type ValidationSchemaType = ObjectSchema<
  | {
      address: string;
      price: string;
      bedrooms: string;
      bathrooms: string;
      livingrooms: string;
    }
  | {
      imageUrl: string;
      summary: string;
    }
  | AnyObject
>;
