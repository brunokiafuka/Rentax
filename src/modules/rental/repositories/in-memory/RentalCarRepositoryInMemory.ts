import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";

import { IRentalsCarRepository } from "../interfaces/IRentalCarRepository";

class RentalCarRepositoryInMemory implements IRentalsCarRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expect_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expect_return_date,
      start_date: new Date(),
      id,
      end_date,
      total,
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

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
}

export { RentalCarRepositoryInMemory };
