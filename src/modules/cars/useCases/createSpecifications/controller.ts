import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationsUseCase } from "./useCase";

class CreateSpecificationsController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationsUseCase
    );

    createSpecificationsUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export default new CreateSpecificationsController();
