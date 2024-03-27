import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUseIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
