import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/appError";

import { SendForgotPasswordMailUseCase } from "./useCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;

let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be to send forgot password mail to the user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await userRepositoryInMemory.create({
      name: "Sophie Boyd",
      password: "1234",
      email: "vu@tuwpeewi.sr",
      driver_license: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("vu@tuwpeewi.sr");

    expect(sendMail).toHaveBeenCalled();
  });

  it("shouldn't be able to send if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("vu@tuwpeewi.sr")
    ).rejects.toEqual(new AppError("User not found", 404));
  });

  it("should able to create a user token", async () => {
    const generateToken = spyOn(usersTokenRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      name: "Adelaide Todd",
      password: "1234",
      email: "uduran@jo.ye",
      driver_license: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("uduran@jo.ye");

    expect(generateToken).toBeCalled();
  });
});
