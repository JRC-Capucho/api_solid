import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";

describe("Create check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id } = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
      select: { id: true },
    });

    await request(app.server)
      .post(`/check-ins/create/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .expect(201);
  });
});
