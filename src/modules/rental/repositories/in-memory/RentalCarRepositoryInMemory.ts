import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";

import { IRentalsCarRepository } from "../interfaces/IRentalCarRepository";

class RentalCarRepositoryInMemory implements IRentalsCarRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expect_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expect_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
}

export { RentalCarRepositoryInMemory };
