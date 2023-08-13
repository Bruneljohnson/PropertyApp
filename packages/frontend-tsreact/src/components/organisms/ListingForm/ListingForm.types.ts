import { type AnyObject, type ObjectSchema } from "yup";

export type ListingFormProps = {
  title: string;
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
