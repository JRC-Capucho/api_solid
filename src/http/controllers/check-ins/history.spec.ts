import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";

describe("History check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list check-in history", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id: gym_id } = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
      select: { id: true },
    });

    const { id: user_id } = await prisma.user.findFirstOrThrow();

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id,
          user_id,
        },
        {
          gym_id,
          user_id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .expect(200);

    expect(response.body.checkIns).toHaveLength(2);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id,
        user_id,
      }),

      expect.objectContaining({
        gym_id,
        user_id,
      }),
    ]);
  });
});
