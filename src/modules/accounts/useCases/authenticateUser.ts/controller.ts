import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./useCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authInfo = await authUserUseCase.execute({ email, password });

    return res.json(authInfo);
  }
}

export default new AuthenticateUserController();
