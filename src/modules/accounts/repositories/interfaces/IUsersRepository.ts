import { ICreateUserDTO } from "../../dtos/ICreateUsers";
import { User } from "../../infra/typorm/entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
