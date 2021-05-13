import { Router } from "express";

import { createSpecificationsController } from "../modules/cars/useCases/createSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) =>
  createSpecificationsController.handle(req, res)
);

/* categoriesRoutes.get("/", (req, res) => {
  const listCategoryService = new ListCategoryService(categoryRepository);

  const all = listCategoryService.execute();

  return res.json(all);
}); */

export { specificationsRoutes };
