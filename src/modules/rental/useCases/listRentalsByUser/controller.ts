import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./useCase";

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const userRentals = await listRentalsByUserUseCase.execute(id);

    return res.status(200).json(userRentals);
  }
}

export default new ListRentalsByUserController();
