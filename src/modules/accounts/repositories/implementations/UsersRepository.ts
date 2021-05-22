import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUsers";
import { User } from "../../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository!: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}

export { UsersRepository };