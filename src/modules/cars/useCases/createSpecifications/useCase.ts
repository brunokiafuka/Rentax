import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationsUseCase };
