import { object, string } from "yup";

import { type ValidationSchemaType } from "./ListingForm.types";

export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CREATE_LISTING_FORM_INITIAL_VALUES = {
  id: "",
  streetName: "",
  city: "",
  postcode: "",
  summary: "",
  bedrooms: "",
  livingrooms: "",
  bathrooms: "",
  price: "",
  imageName: "",
  imageUrl: "",
  createdAt: "",
  updatedAt: "",
};

const requiredMessage = "This field is required";

const step1 = {
  streetName: string().required(requiredMessage),
  city: string().required(requiredMessage),
  postcode: string().required(requiredMessage),
  bedrooms: string().required(requiredMessage),
  livingrooms: string().required(requiredMessage),
  bathrooms: string().required(requiredMessage),
};

const step2 = {
  imageUrl: string().required(requiredMessage),
  summary: string().required(requiredMessage),
  price: string().required(requiredMessage),
};

export const schemaMap = ["step1", "step2", "step2"];

export const getValidationSchema = (step: string): ValidationSchemaType => {
  const schema = step === "step1" ? step1 : step2;
  return object().shape(schema);
};

export const steps = ["Basics", "Description", "Review Listing"];
