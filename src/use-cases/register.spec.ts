import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    });

    const isPasswordCorrectlyHashed = await compare("123", user.password_hash);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    await sut.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    });

    await expect(() =>
      sut.execute({
        name: "joao",
        email: "joao@gmail.com",
        password: "123",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
