import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokensRepository {
  private repository!: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expire_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expire_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.repository.findOne({ refresh_token });
  }
}

export { UsersTokenRepository };
