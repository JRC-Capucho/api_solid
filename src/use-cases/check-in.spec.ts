import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckingsUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkinsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckingsUseCase;
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckingsUseCase(checkinsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      phone: "",
      title: "JavaScript Gym",
      latitude: new Decimal(-22.6732406),
      longitude: new Decimal(-45.027986),
      description: "",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.6732406,
      userLongitude: -45.027986,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.6732406,
      userLongitude: -45.027986,
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -22.6732406,
        userLongitude: -45.027986,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.6732406,
      userLongitude: -45.027986,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.6732406,
      userLongitude: -45.027986,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distance gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      phone: "",
      title: "JavaScript Gym",
      latitude: new Decimal(-22.651816),
      longitude: new Decimal(-44.9894909),
      description: "",
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -22.6732406,
        userLongitude: -45.027986,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
