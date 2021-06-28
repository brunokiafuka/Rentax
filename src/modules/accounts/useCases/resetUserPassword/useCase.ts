import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expire_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase };
