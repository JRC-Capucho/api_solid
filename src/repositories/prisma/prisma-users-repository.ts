import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { IUsersRepository } from "../users-respository";

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
