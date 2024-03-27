import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRespository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRespository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRespository);
  });

  it("should be able to athenticate", async () => {
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
    await expect(() =>
      sut.execute({
        email: "joao@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
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
