import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";

interface IRentalsCarRepository {
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsCarRepository };
