import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to athenticate", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await usersRespository.create({
      name: "joao",
      email: "joao@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "joao@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with no account", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await expect(() =>
      sut.execute({
        email: "joao@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await usersRespository.create({
      name: "joao",
      email: "joao@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "joao@gmail.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await usersRespository.create({
      name: "joao",
      email: "joao@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "jaoao@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
