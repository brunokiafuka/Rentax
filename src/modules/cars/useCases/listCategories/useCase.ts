import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
