import { Router } from "express";
import multer from "multer";

import CreateCategoryController from "@modules/cars/useCases/createCategory/controller";
import ImportCategoryController from "@modules/cars/useCases/importCategory/controller";
import ListCategoriesController from "@modules/cars/useCases/listCategories/controller";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./temp",
});

categoriesRoutes.post("/", CreateCategoryController.handle);

categoriesRoutes.get("/", ListCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ImportCategoryController.handle
);

export { categoriesRoutes };
