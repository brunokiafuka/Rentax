import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typorm/repositories/UsersTokenRepository";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { CarImagesRepository } from "@modules/cars/infra/typorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typorm/repositories/CarsRepository";
import { CategoryRepository } from "@modules/cars/infra/typorm/repositories/CategoryRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typorm/repositories/SpecificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/interfaces/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rental/infra/typeorm/repositories/RentalsRepository";
import { IRentalsCarRepository } from "@modules/rental/repositories/interfaces/IRentalCarRepository";

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

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalsCarRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);
