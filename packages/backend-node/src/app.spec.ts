import request from "supertest";
import app from "./app";

describe("Test request endpoint", () => {
  test("GET - /api/healthcheck", async () => {
    const res = await request(app).get("/api/healthcheck");
    expect(res.statusCode).toBe(200);
  }, 60000);
});
