import { ICheckinsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface IFetchUserCheckinsHistoryRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckinsHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckinsRepository) {}
  async execute({
    userId,
    page,
  }: IFetchUserCheckinsHistoryRequest): Promise<IFetchUserCheckinsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
