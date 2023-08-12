import { Request } from "express";
import { AppError } from "../error";
import { PropertyListing } from "../models/SquelizePropertyModel";
import { ISQL3PropertySchema } from "../models/model-types/property.model";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrlsForS3 } from "../middleware";

//----------Create A New Property Listing----------//
/**
 * Function that creates a single property listing using data sent from frontend.
 * @param {ISQL3PropertySchema} payload - Data object from front end.
 * @return {Promise<ISQL3PropertySchema>}
 */
export const createNewListing = async (payload: ISQL3PropertySchema) => {
  const id = uuidv4();
  const listing = await PropertyListing.create({ ...payload, id });

  return listing;
};

//----------Filter All Property Listings----------//
/**
 * Function that returns all property listings or all property listings depending on the query.
 * @param {{ [prop: string]: string } | Record<string, never>} query - object of strings set in the url.
 * @return {Promise<ISQL3PropertySchema[]>}
 */
export const filterAllListings = async (
  req: Request,
  query: { [prop: string]: string } | Record<string, never>,
) => {
  const limit = (req?.query?.limit as number | undefined) ?? 10;
  const offset = req?.query?.offset as number | undefined;
  const listings = (await PropertyListing.findAll({
    where: query,
    limit,
    offset,
  })) as unknown as ISQL3PropertySchema[];
  const signedDocs = await getSignedUrlsForS3(listings);
  return signedDocs;
};

//----------Get A Single Property Listing----------//
/**
 * Function that returns a single property listing using the id from req.params.
 * @param {string} id - string set in the url.
 * @return {Promise<ISQL3PropertySchema>}
 */
export const returnListingByID = async (id: string) => {
  const listing = (await PropertyListing.findOne({
    where: { id },
  })) as unknown as ISQL3PropertySchema;

  if (!listing) throw new AppError(`No property listing found with that ID`, 404);
  const signedDoc = await getSignedUrlsForS3([listing]);
  return signedDoc[0];
};
