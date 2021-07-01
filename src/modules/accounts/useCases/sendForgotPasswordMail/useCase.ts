import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/appError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const emailTemplatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotEmail.hbs"
    );

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const token = uuidV4();
    const expire_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expire_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_PW_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Reset Password",
      variables,
      emailTemplatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
