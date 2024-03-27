import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRespository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;
describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRespository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRespository);
  });

  it("should be able to get user profile", async () => {
    const { id } = await usersRespository.create({
      email: "joao@gmail",
      name: "joao",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.id).toEqual(id);
  });

  it("should not be able get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
