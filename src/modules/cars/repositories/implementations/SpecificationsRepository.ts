import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ISpecificationsDTO,
} from "../interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository!: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ISpecificationsDTO): Promise<void> {
    const specifications = this.repository.create({ name, description });

    this.repository.save(specifications);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }
}

export { SpecificationsRepository };
