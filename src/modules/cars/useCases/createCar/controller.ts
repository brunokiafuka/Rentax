import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./useCase";

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      brand,
      category_id,
      fine_amount,
    } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      license_plate,
      daily_rate,
      brand,
      category_id,
      fine_amount,
    });

    return res.status(201).json(car);
  }
}

export default new CreateCarController();
