import { getRepository, Repository } from "typeorm";

import {
  ISpecificationsRepository,
  ISpecificationsDTO,
} from "@modules/cars/repositories/interfaces/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository!: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ISpecificationsDTO): Promise<Specification> {
    const specifications = this.repository.create({ name, description });

    this.repository.save(specifications);

    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }

  async findIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }
}

export { SpecificationsRepository };
