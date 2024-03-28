import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymUseCase } from "./fetch-nearby-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { IGymsRepository } from "@/repositories/gyms-repository";

let gymsRepository: IGymsRepository;
let sut: FetchNearbyGymUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      phone: "",
      title: "Near Gym",
      latitude: -22.6732406,
      longitude: -45.027986,
      description: "",
    });

    await gymsRepository.create({
      phone: "",
      title: "Far Gym",
      latitude: -27.6732406,
      longitude: -49.027986,
      description: "",
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.651816,
      userLongitude: -44.9894909,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
