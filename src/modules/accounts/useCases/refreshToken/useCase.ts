import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;

    const users_id = sub;

    const userToken =
      await this.usersTokenRepository.findUserByIdAndRefreshToken(
        users_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token error", 401);
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const {
      secretRefreshToken,
      expiresInRefreshToken,
      expireRefreshTokenDays,
    } = auth;

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: userToken.user_id,
      expiresIn: expiresInRefreshToken,
    });

    const expire_date = this.dateProvider.addDays(expireRefreshTokenDays);

    await this.usersTokenRepository.create({
      user_id: userToken.user_id,
      refresh_token,
      expire_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
