export type JwtUserPayload = {
  sub: string;
  email: string;
  refresh_token?: string;
};
