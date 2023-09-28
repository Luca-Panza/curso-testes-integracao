import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should respond with status 200 and object structure", async () => {
    const { status, body } = await api.get("/event");

    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        image: expect.any(String),
        date: expect.stringMatching(dateRegex),
      })
    );
  });
});
