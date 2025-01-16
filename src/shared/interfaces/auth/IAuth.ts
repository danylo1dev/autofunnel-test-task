export interface IAuth {
  signup(body: unknown): Promise<unknown>;
  login(body: unknown): Promise<unknown>;
}
