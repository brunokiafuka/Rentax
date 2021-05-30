import { Car } from "@modules/cars/infra/typorm/entities/Car";

export interface ICarsRepositoryDTO {
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export interface ICarsRepository {
  create(data: ICarsRepositoryDTO): Promise<Car>;
  findCarByPlate(license_plate: string): Promise<Car>;
}
