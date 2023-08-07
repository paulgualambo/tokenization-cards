import { Token } from '../model/Token';

export interface ITokenRepository {
  AddToken(token: Token): Promise<string>;
  GetToken(token: string): Promise<Token>;
}
