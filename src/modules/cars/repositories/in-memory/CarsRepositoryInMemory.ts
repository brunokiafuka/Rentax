import { Car } from "@modules/cars/infra/typorm/entities/Car";

import {
  ICarsRepository,
  ICarsRepositoryDTO,
} from "../interfaces/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    brand,
    category_id,
    fine_amount,
  }: ICarsRepositoryDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      license_plate,
      daily_rate,
      brand,
      category_id,
      fine_amount,
    });

    this.cars.push(car);

    return car;
  }

  async findCarByPlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  /*  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  } */
}

export { CarsRepositoryInMemory };
