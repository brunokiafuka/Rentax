import { getRepository, Repository } from "typeorm";

import {
  ICarsRepository,
  ICarsRepositoryDTO,
} from "@modules/cars/repositories/interfaces/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    brand,
    category_id,
    fine_amount,
  }: ICarsRepositoryDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      brand,
      category_id,
      fine_amount,
    });

    await this.repository.save(car);

    return car;
  }

  async findCarByPlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }
}

export { CarsRepository };
