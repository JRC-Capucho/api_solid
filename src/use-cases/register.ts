import { IUsersRepository } from "@/repositories/prisma/users-respository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";

interface IRegisterUseCase {
  name: string;
  email: string;
  password: string;
}

interface IRegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUseCase): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithTheSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithTheSameEmail) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
