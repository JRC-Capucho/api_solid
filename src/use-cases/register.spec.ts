import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    });

    const isPasswordCorrectlyHashed = await compare("123", user.password_hash);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    });

    await expect(() =>
    registerUseCase.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  });

  it("should be able to register",async ()=>{
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const {user} = await registerUseCase.execute({
      name: "joao",
      email: "joao@gmail.com",
      password: "123",
    });

    expect(user.id).toEqual(expect.any(String))
  })
});
