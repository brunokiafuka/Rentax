import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
