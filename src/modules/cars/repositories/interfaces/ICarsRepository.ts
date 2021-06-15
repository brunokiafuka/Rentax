import { Car } from "@modules/cars/infra/typorm/entities/Car";
import { Specification } from "@modules/cars/infra/typorm/entities/Specification";

export interface ICarsRepositoryDTO {
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export interface ICarsRepository {
  create(data: ICarsRepositoryDTO): Promise<Car>;
  findCarByPlate(license_plate: string): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  updateCarAvailability(id: string, available: boolean): Promise<void>;
}
