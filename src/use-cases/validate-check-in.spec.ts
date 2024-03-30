import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { afterEach } from "node:test";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let checkinsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validade Check  Use Case", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkinsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validade the check-in", async () => {
    const createdCheckIn = await checkinsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkinsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validade an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "non-exists-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validade the check-in after 20m of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkinsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesIMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesIMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
