import { prisma } from "@/lib/prisma";
import { IUsersRepository } from "@/repositories/prisma/users-respository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface IRegisterUseCase {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterUseCase) {
    const password_hash = await hash(password, 6);

    const userWithTheSameEmail = await this.usersRepository.findByEmail(email)
    
    if (userWithTheSameEmail) throw new UserAlreadyExistsError()


    await this.usersRepository.create({ name, email, password_hash });
  }
}
