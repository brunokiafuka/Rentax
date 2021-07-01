import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsers";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/appError";

import { CreateUserUseCase } from "../createUser/useCase";
import { AuthenticateUserUseCase } from "./useCase";

let authUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider
    );
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
