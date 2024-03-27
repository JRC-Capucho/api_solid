import { CheckIn } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/check-ins-repository";
import { IGymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ICheckingsUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckingsUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckingsUseCase {
  constructor(
    private checkInsRepository: ICheckinsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: ICheckingsUseCaseRequest): Promise<ICheckingsUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const checkInOnSameDate = await this.checkInsRepository.findByUseIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) throw new Error();

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
