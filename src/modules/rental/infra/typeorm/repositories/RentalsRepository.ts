import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalsCarRepository } from "@modules/rental/repositories/interfaces/IRentalCarRepository";

import { Rental } from "../entities/rental";

class RentalsRepository implements IRentalsCarRepository {
  private repository!: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expect_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expect_return_date,
      start_date: new Date(),
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id });
  }
}

export { RentalsRepository };
