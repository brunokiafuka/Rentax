import { Specification } from "../../infra/typorm/entities/Specification";

export interface ISpecificationsDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create(data: ISpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findIds(ids: string[]): Promise<Specification[]>;
}
