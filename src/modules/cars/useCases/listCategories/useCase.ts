import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
