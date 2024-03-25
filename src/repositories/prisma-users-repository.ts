import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "./prisma/users-respositoryy";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data:Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })
    return user
  }
}
