import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Validate check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

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

    const { id: checkInId } = await prisma.checkIn.create({
      data: {
        gym_id,
        user_id,
      },
      select: { id: true },
    });

    await request(app.server)
      .patch(`/check-ins/validate/${checkInId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkInId,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
