import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "9QnZD@example.com",
      password: "123456",
    });

    const response = await request(app.server)
      .post("/sessions")
      .send({
        email: "9QnZD@example.com",
        password: "123456",
      })
      .expect(200);

    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
