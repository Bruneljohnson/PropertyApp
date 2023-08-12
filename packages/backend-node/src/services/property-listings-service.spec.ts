/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { teardown } from "../__mocks__";
import { ISQL3PropertySchema } from "../models/model-types/property.model";
import {
  createNewListing,
  filterAllListings,
  returnListingByID,
} from "./property-listings-service";
import { PropertyListing } from "../models/SquelizePropertyModel";
import { closeDatabase, launchDatabase } from "../config/database";

beforeAll(async () => {
  await launchDatabase();
});

afterAll(async () => {
  await teardown();
  await closeDatabase();
});

//  TEST CREATE A NEW PROPERTY LISTING
describe("create property listing", () => {
  const listingSchema: ISQL3PropertySchema = {
    id: "",
    address: `steve's address, steve's city, te10 4st`,
    price: "£500,000",
    imageName: "073adf885d49cb19ee078e2cb13a9d2e8c240348133db0dc7a53f30168af02b9.jpeg",
    imageUrl: "",
  };

  it("Should save valid payload to db", async () => {
    const result = await createNewListing(listingSchema);
    const id = result.getDataValue("id");

    const expectedPropertyListing = await PropertyListing.findOne({ where: { id } });
    if (expectedPropertyListing) {
      expect(id).toEqual(expectedPropertyListing.getDataValue("id"));
    }
  });

  it("Should throw a ValidationError if a field is undefined", async () => {
    expect.assertions(1);

    const invalidPayload = {
      ...listingSchema,
      price: undefined as unknown as string,
    };
    const attempt = async () => {
      await createNewListing(invalidPayload);
    };
    await expect(attempt).rejects.toThrow(
      "notNull Violation: PropertyListing.price cannot be null",
    );
  });
});

// TEST GET SINGLE PROPERTY LISTING
describe("get single property listing", () => {
  it("Should return a single property listing using id from DB", async () => {
    const listing = await PropertyListing.findAll();

    const result = (await returnListingByID(
      listing[0].getDataValue("id"),
    )) as unknown as PropertyListing;
    console.log(result);
    const id = result.getDataValue("id");
    if (result) {
      expect(id).toEqual(listing[0].getDataValue("id"));
      expect(result.getDataValue("price")).toEqual(listing[0].getDataValue("price"));
    }
  });

  it("Should throw error if ID doesn't exist on DB", async () => {
    const dodgyID = "112232323";

    const attempt = async () => await returnListingByID(dodgyID);

    await expect(attempt).rejects.toThrow("No property listing found with that ID");
  });
});

// TEST GET ALL PROPERTY LISTINGS
describe("get all property listings", () => {
  it("Should return an array of property listings from DB without query", async () => {
    const req = {} as any;
    const result = await filterAllListings(req, {});
    if (result) {
      expect(result).toHaveLength(1);
    }
  });

  it("Should return an array of property listings from DB that match query", async () => {
    const req = {} as any;
    const result = await filterAllListings(req, { price: "£500,000" });
    if (result) {
      expect(result).toHaveLength(1);
    }
  });

  it("Should return empty documents field if DB is an empty object", async () => {
    await PropertyListing.destroy({
      where: {
        price: "£500,000",
      },
    });
    const req = {} as any;
    const result = await filterAllListings(req, {});
    if (result) {
      expect(result).toHaveLength(0);
    }
  });
});
