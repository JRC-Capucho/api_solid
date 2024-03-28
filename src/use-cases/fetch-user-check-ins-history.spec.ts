import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkinsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch users check ins history Use Case", () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkinsRepository);
  });

  it("should be able to fetch check in history", async () => {
    await checkinsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkinsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-01",
      }),
      expect.objectContaining({
        gym_id: "gym-02",
      }),
    ]);
  });

  it("should be able to getch paginaed check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-21",
      }),
      expect.objectContaining({
        gym_id: "gym-22",
      }),
    ]);
  });
});
