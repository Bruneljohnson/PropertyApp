import { v4 as uuidv4 } from "uuid";
import { ISQL3PropertySchema } from "../models/model-types/property.model";
import { PropertyListing } from "../models/SquelizePropertyModel";

const createTestListing = async (name: string, changeStr: string) => {
  const listingSchema: ISQL3PropertySchema = {
    id: uuidv4(),
    streetName: `${name} street`,
    city: `${name} city`,
    postcode: `${name[0]}e10 4st`,
    summary: `A lovely 3 bedroom terrace house based in a leafy green area in london.`,
    bedrooms: "3",
    bathrooms: "3",
    livingrooms: "3",
    price: "£500,000",
    imageName: `073adf885d49cb19ee078e2cb13a9d2e8c240348133db0d${changeStr}f30168af02b9.jpeg`,
    imageUrl: "",
  };

  return await PropertyListing.create(listingSchema);
};

const setup = async () => {
  await Promise.all([createTestListing("bob's", "e0b27"), createTestListing("sue's", "f6a33")]);
};

const teardown = async () => {
  await PropertyListing.destroy({
    where: {
      price: "£500,000",
    },
  });
};

export { createTestListing, setup, teardown };
