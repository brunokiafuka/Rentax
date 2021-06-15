import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { IRentalsCarRepository } from "@modules/rental/repositories/interfaces/IRentalCarRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class RentalDevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsCarRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minDaily = 1;
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental not found", 404);
    }

    const dateNow = this.dateProvider.dateNow();

    let daysAmount = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daysAmount <= 0) {
      daysAmount = minDaily;
    }

    const returnDelay = this.dateProvider.compareInDays(
      dateNow,
      rental.expect_return_date
    );

    let total = 0;

    if (returnDelay > 0) {
      const calculateFine = returnDelay * car.fine_amount;
      total = calculateFine;
    }

    total += returnDelay * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateCarAvailability(car.id, true);

    return rental;
  }
}

export { RentalDevolutionUseCase };
