import { Response, Request } from "express";

import { ImportCategoryUseCase } from "./useCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.importCategoryUseCase.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
