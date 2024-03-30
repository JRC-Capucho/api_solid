import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gym", async () => {
    await gymsRepository.create({
      phone: "",
      title: "JavaScript Gym",
      latitude: -22.6732406,
      longitude: -45.027986,
      description: "",
    });

    await gymsRepository.create({
      phone: "",
      title: "TypeScript Gym",
      latitude: -22.6732406,
      longitude: -45.027986,
      description: "",
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        phone: "",
        title: `JavaScript Gym ${i}`,
        latitude: -22.6732406,
        longitude: -45.027986,
        description: "",
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);

    expect(gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym 21",
      }),
      expect.objectContaining({
        title: "JavaScript Gym 22",
      }),
    ]);
  });
});
