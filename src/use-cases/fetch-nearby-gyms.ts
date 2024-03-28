import { IGymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface IFetchNearbyGymRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymResponse {
  gyms: Gym[];
}

export class FetchNearbyGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymRequest): Promise<IFetchNearbyGymResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      longitude: userLongitude,
      latitude: userLatitude,
    });

    return { gyms };
  }
}
