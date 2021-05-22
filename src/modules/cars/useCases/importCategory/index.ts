import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ImportCategoryController } from "./controller";
import { ImportCategoryUseCase } from "./useCase";

const categoryRepository = null;

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
