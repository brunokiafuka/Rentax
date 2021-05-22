import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../interfaces/ICategoriesRepository";

class CategoryRepository implements ICategoriesRepository {
  // private static INSTANCE: CategoryRepository;
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoryRepository {
  //   if (!CategoryRepository.INSTANCE) {
  //     CategoryRepository.INSTANCE = new CategoryRepository();
  //   }

  //   return CategoryRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }
}

export { CategoryRepository };
