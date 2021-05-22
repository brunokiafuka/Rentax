import { Router } from "express";

import createSpecificationsController from "../modules/cars/useCases/createSpecifications/controller";

const specificationsRoutes = Router();

specificationsRoutes.post("/", createSpecificationsController.handle);

/* categoriesRoutes.get("/", (req, res) => {
  const listCategoryService = new ListCategoryService(categoryRepository);

  const all = listCategoryService.execute();

  return res.json(all);
}); */

export { specificationsRoutes };
