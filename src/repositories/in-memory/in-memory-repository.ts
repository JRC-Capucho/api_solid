import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../prisma/users-respository";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if(!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "54dcff3e-4802-4a7e-9a16-02564f145b96",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
