import { Category } from "../entities/Category";
import { ICategoriesRepository } from "../repositories/interfaces/ICategoriesRepository";

class ListCategoryService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoryService };
