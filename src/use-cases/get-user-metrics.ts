import { ICheckInsRepository } from "@/repositories/check-ins-repository";

interface IGetUserMetricsRequest {
  userId: string;
}

interface IGetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRespository: ICheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRespository.countByUserId(userId);

    return { checkInsCount };
  }
}
