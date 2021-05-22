import { ICreateUserDTO } from "../../dtos/ICreateUsers";
import { User } from "../../entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
