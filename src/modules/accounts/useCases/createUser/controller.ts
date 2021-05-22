import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./useCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, email, driver_license } = req.body;
    const createUserUserCase = container.resolve(CreateUserUseCase);

    await createUserUserCase.execute({
      name,
      password,
      email,
      driver_license,
    });

    return res.status(201).send();
  }
}

export default new CreateUserController();
