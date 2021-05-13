import { Request, Response } from "express";

import { CreateSpecificationsUseCase } from "./useCase";

class CreateSpecificationsController {
  constructor(
    private createSpecificationsController: CreateSpecificationsUseCase
  ) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createSpecificationsController.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationsController };
