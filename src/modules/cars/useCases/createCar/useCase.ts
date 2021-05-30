import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    license_plate,
    daily_rate,
    brand,
    category_id,
    fine_amount,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findCarByPlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car Already Exists");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      license_plate,
      daily_rate,
      brand,
      category_id,
      fine_amount,
    });

    return car;
  }
}

export { CreateCarUseCase };
