import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typorm/entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";

class UsersTokenRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    user_id,
    expire_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expire_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const idIndex = this.usersTokens.findIndex((ut) => ut.user_id === id);

    this.usersTokens.splice(idIndex);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (usersToken) => usersToken.refresh_token === refresh_token
    );
  }
}

export { UsersTokenRepositoryInMemory };
