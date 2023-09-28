import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { status } = await api.post("/users").send({
      email: "lucapanza@gmail.com",
      password: "password123",
    });

    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await prisma.user.create({
      data: {
        email: "lucapanza@gmail.com",
        password: "password123",
      },
    });

    const { status } = await api.post("/users").send({
      email: "lucapanza@gmail.com",
      password: "password123",
    });

    expect(status).toBe(409);
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = await prisma.user.create({
      data: {
        email: "lucapanza@gmail.com",
        password: "password123",
      },
    });

    const { status, body } = await api.get(`/users/${user.id}`);

    expect(status).toBe(200);
    expect(body).toEqual({
      id: user.id,
      email: "lucapanza@gmail.com",
      password: "password123",
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const user = await prisma.user.create({
      data: {
        email: "lucapanza@gmail.com",
        password: "password123",
      },
    });

    const { status } = await api.get(`/users/${user.id + 1}`);

    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: {
        email: "lucapanza@gmail.com",
        password: "password123",
      },
    });

    await prisma.user.create({
      data: {
        email: "annepanza@gmail.com",
        password: "password123",
      },
    });

    const { status, body } = await api.get("/users");

    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String),
        }),
      ])
    );
  });
});
