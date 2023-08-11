import {
  createNewListing,
  filterAllListings,
  returnListingByID,
} from "../services/property-listings-service";
import { createOne, getAll, getOne } from "./handler-refactory";

export const createListing = createOne(createNewListing);

export const getAllListings = getAll(filterAllListings);

export const getListingByID = getOne(returnListingByID);
