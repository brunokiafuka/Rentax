import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./useCase";

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoryUseCase);
    const all = await listCategoriesUseCase.execute();

    return res.json(all);
  }
}

export default new ListCategoriesController();
