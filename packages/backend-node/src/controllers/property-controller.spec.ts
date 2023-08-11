import request from "supertest";

import app from "../app";
import { setup, teardown } from "../__mocks__";
import { ISQL3PropertySchema } from "../models/model-types/property.model";
import path from "path";
import { closeDatabase, launchDatabase } from "../config/database";
import { PropertyListing } from "../models/SquelizePropertyModel";

beforeAll(async () => {
  await launchDatabase();
  await setup();
});

afterAll(async () => {
  await teardown();
  await closeDatabase();
});

interface ResponseBody {
  length: number;
  data: ISQL3PropertySchema[];
}
interface ResponseSingleBody {
  data: ISQL3PropertySchema;
}

//  TEST CREATE SINGLE PROPERTY LISTING
describe("POST /api/listings", () => {
  it("Should create a property listing", async () => {
    // Given
    const apiUrl = "/api/listings/";
    // When
    const response = await request(app)
      .post(apiUrl)
      .field("id", "")
      .field("address", `mike's address, mike's city, te10 4st`)
      .field("price", "£500,000")
      .field("imageUrl", "")
      .attach("imageName", path.resolve(__dirname, "../__mocks__/test-assets/test-house.jpeg"));

    // Then
    expect(response.statusCode).toEqual(201);
    expect(response.body as ResponseSingleBody).toHaveProperty("data");
    const { data } = response.body as ResponseSingleBody;
    expect(Object.keys(data)).toHaveLength(7);
    expect(data).toHaveProperty("price", "£500,000");
  });
  it("Should fail to create a property listing", async () => {
    // Given
    const apiUrl = "/api/listings/";
    // When
    const response = await request(app).post(apiUrl).send();

    // Then
    expect(response.statusCode).toEqual(500);
    expect(response.body).not.toBeNull();
    expect(response.body).toHaveProperty("message", "Something went wrong.");
  });
});

// TEST GET ALL PROPERTY LISTINGS
describe("GET /api/listings", () => {
  it("Should return list of property listings", async () => {
    // Given
    const apiUrl = "/api/listings";

    // When
    const response = await request(app).get(apiUrl);

    // Then
    expect(response.statusCode).toBe(200);
    expect((response.body as ResponseBody).data).toHaveLength(3);
  });
});

// TEST GET SINGLE PROPERTY LISTING
describe("GET /api/listings/:id", () => {
  it("Should find a single property listing", async () => {
    // Given
    const listing = await PropertyListing.findAll();
    const apiUrl = `/api/listings/${listing[0].getDataValue("id")}`;

    // When
    const response = await request(app).get(apiUrl);

    // Then
    expect(response.statusCode).toEqual(200);
    expect(response.body).not.toBeNull();
    const userReturned = (response.body as ResponseSingleBody).data;
    expect(userReturned).toHaveProperty("address", listing[0].getDataValue("address"));
  });

  it("Should fail if ID is incorrect.", async () => {
    // Given
    const apiUrl = `/api/listings/564534535432523`;

    // When
    const response = await request(app).get(apiUrl);

    // Then
    expect(response.statusCode).toEqual(400);
    expect(response.body).not.toBeNull();
    expect(response.body).toHaveProperty("message", "The value should be uuid v4");
  });
  it("Should fail if ID is correct but listing no longer exists.", async () => {
    // Given
    const apiUrl = `/api/listings/0d2100eb-3220-4b59-9227-c2f5d5651a03`;

    // When
    const response = await request(app).get(apiUrl);

    // Then
    expect(response.statusCode).toEqual(404);
    expect(response.body).not.toBeNull();
    expect(response.body).toHaveProperty("message", "No property listing found with that ID");
  });
});

// TEST GET 404 ERROR
describe("GET /unknown-endpoint", () => {
  it("Should return a 404 error", async () => {
    // Given
    const apiUrl = "/unknown/endpoint";

    // When
    const response = await request(app).get(apiUrl);

    // Then
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "Fail");
    expect(response.body).toHaveProperty("message", "Cant find /unknown/endpoint on this Server");
  });
});
