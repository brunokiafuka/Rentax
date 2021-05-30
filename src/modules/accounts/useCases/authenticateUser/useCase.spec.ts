import { AppError } from "@shared/errors/appError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsers";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/useCase";
import { AuthenticateUserUseCase } from "./useCase";

let authUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Bruno",
      password: "1234",
      email: "bruno@rentx.com",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able authenticate a non-existing user", () => {
    expect(async () => {
      await authUserUseCase.execute({
        email: "fake@rentx.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able authenticate a user with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Bruno",
        password: "1234",
        email: "bruno@rentx.com",
        driver_license: "123456",
      };

      await createUserUseCase.execute(user);

      await authUserUseCase.execute({
        email: user.email,
        password: "wrong-pass",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
