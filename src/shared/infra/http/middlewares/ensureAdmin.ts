import { Response, Request, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User doesn't have permission", 401);
  }

  next();
}
