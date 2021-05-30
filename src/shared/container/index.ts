import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { CarsRepository } from "@modules/cars/infra/typorm/repositories/CarsRepository";
import { CategoryRepository } from "@modules/cars/infra/typorm/repositories/CategoryRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
