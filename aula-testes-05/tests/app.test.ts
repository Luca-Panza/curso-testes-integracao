import supertest from "supertest";
import app from "./../src/app";

const server = supertest(app);

describe("GET /health", () => {
  it("should return 200 status when ask /health", async () => {
    const { status, text } = await server.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });
});

describe("GET /fibonacci", () => {
  it("should return 400 status when elements is a string", async () => {
    const elements = "abc";

    const { status, text } = await server.get(`/fibonacci?elements=${elements}`);

    expect(status).toEqual(400);
    expect(text).toBe("Bad Request");
  });

  it("should return 400 status when elements is < 1", async () => {
    const elements = 0;

    const { status, text } = await server.get(`/fibonacci?elements=${elements}`);

    expect(status).toEqual(400);
    expect(text).toBe("Bad Request");
  });

  it("should return a 200 status and an array with a length equal to 'elements' when 'elements' is a number.", async () => {
    const elements = 5;

    const { status, body } = await server.get(`/fibonacci?elements=${elements}`);

    expect(status).toBe(200);
    expect(body).toHaveLength(elements);
  });
});
