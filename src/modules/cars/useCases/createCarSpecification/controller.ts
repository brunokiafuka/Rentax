import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./useCase";

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return res.json(car).status(201);
  }
}

export default new CreateCarSpecificationController();
