import { Request, Response } from "express";

import { ListCategoryUseCase } from "./useCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const all = this.listCategoriesUseCase.execute();

    return res.json(all);
  }
}

export { ListCategoriesController };
