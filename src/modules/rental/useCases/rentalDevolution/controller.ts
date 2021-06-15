import { Request, Response } from "express";
import { container } from "tsyringe";

import { RentalDevolutionUseCase } from "./useCase";

class RentalDevolutionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;
    const rentalDevolution = container.resolve(RentalDevolutionUseCase);

    const rental = await rentalDevolution.execute({ id, user_id });

    return res.status(200).json(rental);
  }
}

export default new RentalDevolutionController();
