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
    specifications,
    id,
  }: ICarsRepositoryDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findCarByPlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }
    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    }
    if (name) {
      carsQuery.andWhere("cars.name = :name", { name });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    return this.repository.findOne(car_id);
  }

  async updateCarAvailability(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id", { id })
      .execute();
  }
}

export { CarsRepository };
