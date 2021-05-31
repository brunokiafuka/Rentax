import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, category_id, name);

    return cars;
  }
}

export { ListAvailableCarsUseCase };
