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
    specifications,
    id,
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
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  async findCarByPlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
  }

  async updateCarAvailability(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    console.log(findIndex);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
