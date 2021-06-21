import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsCarRepository } from "@modules/rental/repositories/interfaces/IRentalCarRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsCarRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
