import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const {
      secretToken,
      expiresIn,
      secretRefreshToken,
      expiresInRefreshToken,
      expireRefreshTokenDays,
    } = auth;

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refresh_token_expired_date = this.dateProvider.addDays(
      expireRefreshTokenDays
    );

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expire_date: refresh_token_expired_date,
    });

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn,
    });

    const authReturn: IResponse = {
      token,
      user: {
        email,
        name: user.name,
      },
      refresh_token,
    };

    return authReturn;
  }
}

export { AuthenticateUserUseCase };
