import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/appError";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
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

    const token = sign({}, "a7e071b3de48cec1dd24de6cbe6c7bf1", {
      subject: user.id,
      expiresIn: "1d",
    });

    const authReturn: IResponse = {
      token,
      user: {
        email,
        name: user.name,
      },
    };

    return authReturn;
  }
}

export { AuthenticateUserUseCase };
