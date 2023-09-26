import app from "../src/app";
import supertest from "supertest";

const server = supertest(app);

describe("GET /health", () => {
  it("when the api is running should respond with statusCode 200", async () => {
    const result = await server.get("/health");

    const { statusCode } = result;

    expect(statusCode).toBe(200);
  });
});
