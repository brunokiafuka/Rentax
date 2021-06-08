import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsCarRepository } from "@modules/rental/repositories/interfaces/IRentalCarRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsCarRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expect_return_date,
  }: IRequest): Promise<Rental> {
    const minHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There is a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expect_return_date
    );

    if (compare < minHours) {
      throw new AppError("Invalid return time");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
