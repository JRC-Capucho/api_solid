import { IGymsRepository } from "@/repositories/gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: IGymsRepository;
let sut: CreateGymUseCase;
describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });
  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      phone: "",
      title: "JavaScript Gym",
      latitude: -22.6732406,
      longitude: -45.027986,
      description: "",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
