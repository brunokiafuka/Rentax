import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./useCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      await createCategoryUseCase.execute({ name, description });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new CreateCategoryController();
