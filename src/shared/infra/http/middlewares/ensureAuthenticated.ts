import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
// import { UsersTokenRepository } from "@modules/accounts/infra/typorm/repositories/UsersTokenRepository";

import { AppError } from "../../../errors/appError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secretToken) as IPayload;

    // const usersTokenRepository = new UsersTokenRepository();

    // const user = await usersTokenRepository.findUserByIdAndRefreshToken(
    //   user_id,
    //   token
    // );

    // if (!user) {
    //   throw new AppError("User does not exist");
    // }

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
