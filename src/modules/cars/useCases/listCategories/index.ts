import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ListCategoriesController } from "./controller";
import { ListCategoryUseCase } from "./useCase";

const categoryRepository = null;
const listCategoriesUseCase = new ListCategoryUseCase(categoryRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
